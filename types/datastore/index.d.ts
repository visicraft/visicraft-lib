import { RxDatabase } from "rxdb";
import { RaceCollection } from "./races";
export declare type VisicraftCollections = {
    races: RaceCollection;
};
export declare type VisicraftDatastore = RxDatabase<VisicraftCollections>;
/**
 * Creates the various collections on the datastores, if they don't already exist
 */
export declare function create_collections(datastore: VisicraftDatastore): Promise<void[]>;
