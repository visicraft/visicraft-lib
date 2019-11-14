import { RxCollection, RxDocument, RxJsonSchema } from "rxdb";
import { VisicraftDatastore } from ".";
import { CONTENT_TYPES } from "../util/content";
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
export declare type RaceDocumentMethods = {};
export declare type RaceCollectionMethods = {};
export declare type RaceDocument = RxDocument<RaceDocumentType, RaceDocumentMethods>;
export declare type RaceCollection = RxCollection<RaceDocumentType, RaceDocumentMethods, RaceCollectionMethods>;
export declare const RACE_COLLECTION_METHODS: RaceCollectionMethods;
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
