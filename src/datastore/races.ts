import {sha1} from "crypto-hash";
import {RxCollection, RxDocument, RxJsonSchema, RxQuery} from "rxdb";
import slugify from "slugify";

import {VisicraftDatastore} from ".";
import {CONTENT_TYPES, SORTING_DIRECTIONS, SORTING_MODES} from "../util/constants";
import {escape_regex} from "../util/string";

/**
 * Represents the options passable into `RaceCollection.query_races`
 */
export interface IQueryRacesOptions {
    /**
     * Represents the full-text filter for `.contributors` and `.title` (default: `''`)
     */
    filter?: string;

    /**
     * Represents the sorting direction of the given `.sorting_mode` (default: `SORTING_DIRECTIONS.ascending`)
     */
    sorting_direction?: SORTING_DIRECTIONS;

    /**
     * Represents the sorting mode for ordering the returned results of the query (default: `SORTING_MODE.recent`)
     */
    sorting_mode?: SORTING_MODES;
}

/**
 * Represents the Race Typescript representation of the datastore Document
 */
export type RaceDocumentType = {
    /**
     * Represents the persistent identifier of the Race
     */
    identifier: string;

    /**
     * Represents the Content Type of the Race (always `CONTENT_TYPES.races`)
     */
    content_type: CONTENT_TYPES.races;

    /**
     * Represents the authors who contributed to the Race
     */
    contributors: string[];

    /**
     * Represents the multi-line longform description of the Race (usually Markdown in official clients)
     */
    description: string;

    /**
     * Represents the single-line shortform description of the Race
     */
    summary: string;

    /**
     * Represents the single-line title of the Race
     */
    title: string;
};

/**
 * Represents the TypeScript interface for the methods associated with Race Documents
 */
export type RaceDocumentMethods = {
    get_short_identifier: () => string;
    get_title_slug: () => string;
};

/**
 * Represents the TypeScript interface for methods associated with the Races Collection
 */
export type RaceCollectionMethods = {
    query_race(slug: string): void;

    query_races(
        options: IQueryRacesOptions
    ): RxQuery<RaceDocumentType, RxDocument<RaceDocumentType, RaceDocumentMethods>[]>;
};

export type RaceDocument = RxDocument<RaceDocumentType, RaceDocumentMethods>;

export type RaceCollection = RxCollection<
    RaceDocumentType,
    RaceDocumentMethods,
    RaceCollectionMethods
>;

export const RACE_COLLECTION_METHODS: RaceCollectionMethods = {
    /**
     * Returns a query for a singular Race content, allowing for standardized shortened `.identifier` lookup
     */
    query_race(this: RaceCollection, identifier: string): void {},

    /**
     * Returns a query for multi-Race content, allowing standardized sorting and filtering
     */
    query_races(
        this: RaceCollection,
        options: IQueryRacesOptions = {}
    ): RxQuery<RaceDocumentType, RxDocument<RaceDocumentType, RaceDocumentMethods>[]> {
        const {filter, sorting_direction, sorting_mode} = Object.assign(
            {
                filter: "",
                sorting_direction: SORTING_DIRECTIONS.ascending,
                sorting_mode: SORTING_MODES.recent
            },
            options
        );

        // We need to dynamically select the direction symbol string based on direction,
        // for RxDB, empty is ascending, minus is decending
        let sorting_symbol;
        if (sorting_direction === SORTING_DIRECTIONS.ascending) sorting_symbol = "";
        else if (sorting_direction === SORTING_DIRECTIONS.decending) sorting_symbol = "-";
        else {
            throw new Error(
                `bad dispatch to 'RaceCollection.query_races' (bad sorting direction ${sorting_direction})`
            );
        }

        // TODO: support `SORTING_MODES.recent`
        // If we're sorting by recentness, we need to go by update timestamp.
        // If by alphabet, go by title
        let query = this.find();
        if (sorting_mode === SORTING_MODES.alphabetical) {
            query = query.sort(sorting_symbol + "title");
        } else if (sorting_mode === SORTING_MODES.recent) {
            query = query.sort(sorting_symbol + "identifier");
        } else {
            throw new Error(
                `bad dispatch to 'RaceCollection.query_races' (bad sorting mode ${sorting_mode})`
            );
        }

        if (filter) {
            // Allow end-users to filter via full-text search on the title and contributors, ignoring letter casing
            const _filter = escape_regex(filter);
            const regex = new RegExp(`.*${_filter}.*`, "i");

            query = query.or([
                {
                    title: {$regex: regex}
                },
                {
                    contributors: {$regex: regex}
                }
            ]);
        }

        return query;
    }
};

/**
 * Represents the methods associated with a `RaceDocument` instance
 */
export const RACE_DOCUMENT_METHODS: RaceDocumentMethods = {
    /**
     * Returns the shortened variant of the `.identifier` property
     */
    get_short_identifier(this: RaceDocument): string {
        return this.identifier.substr(0, 8);
    },

    /**
     * Returns the slug-variant of the Race's title
     */
    get_title_slug(this: RaceDocument): string {
        return slugify(this.title);
    }
};

/**
 * Represents the JSON Schema for validating Races and creating the datastore Collection
 */
export const RACE_DOCUMENT_SCHEMA: RxJsonSchema<RaceDocumentType> = {
    title: "races",
    description: "Schema for validating internally stored WCS Races",
    version: 0,

    keyCompression: true,

    required: ["contributors", "description", "summary", "title"],
    type: "object",

    properties: {
        identifier: {
            type: "string",
            primary: true
        },

        description: {type: "string"},
        summary: {type: "string"},

        content_type: {
            type: "string",
            default: CONTENT_TYPES.races,
            index: true,
            final: true,

            enum: [CONTENT_TYPES.races]
        },

        contributors: {
            type: "array",
            final: true,

            items: {type: "string"}
        },

        title: {
            type: "string",
            index: true
        }
    }
};

/**
 * Prepares Race data before insertion into the datastore
 */
async function on_pre_insert(data: RaceDocumentType): Promise<void> {
    // Every Race needs a identifier generated from their metadata
    data.identifier = await generate_identifier(data);
}

/**
 * Prepares Race data before every mutation into the datastore
 */
async function on_pre_save(data: RaceDocumentType): Promise<void> {
    // Every Race needs a identifier generated from their metadata
    data.identifier = await generate_identifier(data);
}

/**
 * Returns the hash hex identifier for the given Race
 *
 * Algorithm:
 *  sha1( slugify(.title) + map(.contributors, slugify).sort() )
 */
export function generate_identifier(data: RaceDocumentType): Promise<string> {
    let {contributors, title} = data;

    contributors = contributors.map((contributor) => slugify(contributor));
    contributors.sort();

    const _contributors = contributors.join("");
    title = slugify(title);

    return sha1(title + contributors);
}

/**
 * Creates the Race collection on the datastore, if not previously existed
 */
export async function create_collection(datastore: VisicraftDatastore): Promise<void> {
    const collection = await datastore.collection({
        name: "races",

        methods: RACE_DOCUMENT_METHODS,
        schema: RACE_DOCUMENT_SCHEMA,
        statics: RACE_COLLECTION_METHODS
    });

    collection.preInsert(on_pre_insert, false);
    collection.preSave(on_pre_save, false);
}
