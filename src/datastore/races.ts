import {sha1} from "crypto-hash";
import {RxCollection, RxDocument, RxJsonSchema} from "rxdb";
import slugify from "slugify";

import {VisicraftDatastore} from ".";
import {CONTENT_TYPES} from "../util/content";

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

export type RaceDocumentMethods = {};

export type RaceCollectionMethods = {};

export type RaceDocument = RxDocument<RaceDocumentType, RaceDocumentMethods>;

export type RaceCollection = RxCollection<
    RaceDocumentType,
    RaceDocumentMethods,
    RaceCollectionMethods
>;

export const RACE_COLLECTION_METHODS: RaceCollectionMethods = {};

export const RACE_DOCUMENT_METHODS: RaceDocumentMethods = {};

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
