import { RxCollection, RxDocument, RxJsonSchema } from "rxdb";
import { VisicraftDatastore } from ".";
export declare type RaceDocumentType = {
    identifier: string;
    description: string;
    summary: string;
    title: string;
};
export declare type RaceDocumentMethods = {};
export declare type RaceCollectionMethods = {};
export declare type RaceDocument = RxDocument<RaceDocumentType, RaceDocumentMethods>;
export declare type RaceCollection = RxCollection<RaceDocumentType, RaceDocumentMethods, RaceCollectionMethods>;
export declare const RACE_COLLECTION_METHODS: RaceCollectionMethods;
export declare const RACE_DOCUMENT_METHODS: RaceDocumentMethods;
export declare const RACE_DOCUMENT_SCHEMA: RxJsonSchema<RaceDocumentType>;
/**
 * Creates the Race collection on the datastore, if not previously existed
 */
export declare function create_collection(datastore: VisicraftDatastore): Promise<void>;
