import {sha1} from "crypto-hash";
import {RxCollection, RxDocument, RxJsonSchema} from "rxdb";
import slugify from "slugify";

import {VisicraftDatastore} from ".";

export type RaceDocumentType = {
    identifier: string;

    contributors: string[];

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

    required: ["contributors", "description", "summary", "title"],
    type: "object",

    properties: {
        identifier: {
            type: "string",
            primary: true
        },

        description: {type: "string"},
        summary: {type: "string"},
        title: {type: "string"},

        contributors: {
            final: true,
            type: "array",

            items: {type: "string"}
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
