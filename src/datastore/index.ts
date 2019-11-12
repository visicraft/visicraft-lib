import {RxDatabase} from "rxdb";

import {RaceCollection, create_collection as create_races_collection} from "./races";

export type VisicraftCollections = {
    races: RaceCollection;
};

export type VisicraftDatastore = RxDatabase<VisicraftCollections>;

/**
 * Creates the various collections on the datastores, if they don't already exist
 */
export function create_collections(datastore: VisicraftDatastore): Promise<void[]> {
    const promise = Promise.all([create_races_collection(datastore)]);

    return promise;
}
