import {RxCollection, RxDocument, RxJsonSchema} from "rxdb";
import {VisicraftDatastore} from ".";

export type RaceDocumentType = {
    identifier: string;

    description: string;

    summary: string;

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

export const RACE_DOCUMENT_SCHEMA: RxJsonSchema<RaceDocumentType> = {
    title: "races",
    description: "Schema for validating internally stored WCS Races",
    version: 0,

    keyCompression: true,

    required: ["description", "summary", "title"],
    type: "object",

    properties: {
        identifier: {
            type: "string",
            primary: true
        },

        description: {type: "string"},
        summary: {type: "string"},
        title: {type: "string"}
    }
};

/**
 * Creates the Race collection on the datastore, if not previously existed
 */
export function create_collection(datastore: VisicraftDatastore): Promise<void> {
    return datastore.collection({
        name: "races",

        methods: RACE_DOCUMENT_METHODS,
        schema: RACE_DOCUMENT_SCHEMA,
        statics: RACE_COLLECTION_METHODS
    });
}
