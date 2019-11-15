import { RxCollection, RxDocument, RxJsonSchema, RxQuery } from "rxdb";
import { VisicraftDatastore } from ".";
import { CONTENT_TYPES, SORTING_DIRECTIONS, SORTING_MODES } from "../util/constants";
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
export declare type RaceDocumentType = {
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
export declare type RaceDocumentMethods = {
    get_short_identifier: () => string;
    get_title_slug: () => string;
};
/**
 * Represents the TypeScript interface for methods associated with the Races Collection
 */
export declare type RaceCollectionMethods = {
    query_race(slug: string): void;
    query_races(options: IQueryRacesOptions): RxQuery<RaceDocumentType, RxDocument<RaceDocumentType, RaceDocumentMethods>[]>;
};
export declare type RaceDocument = RxDocument<RaceDocumentType, RaceDocumentMethods>;
export declare type RaceCollection = RxCollection<RaceDocumentType, RaceDocumentMethods, RaceCollectionMethods>;
export declare const RACE_COLLECTION_METHODS: RaceCollectionMethods;
/**
 * Represents the methods associated with a `RaceDocument` instance
 */
export declare const RACE_DOCUMENT_METHODS: RaceDocumentMethods;
/**
 * Represents the JSON Schema for validating Races and creating the datastore Collection
 */
export declare const RACE_DOCUMENT_SCHEMA: RxJsonSchema<RaceDocumentType>;
/**
 * Returns the hash hex identifier for the given Race
 *
 * Algorithm:
 *  sha1( slugify(.title) + map(.contributors, slugify).sort() )
 */
export declare function generate_identifier(data: RaceDocumentType): Promise<string>;
/**
 * Creates the Race collection on the datastore, if not previously existed
 */
export declare function create_collection(datastore: VisicraftDatastore): Promise<void>;
