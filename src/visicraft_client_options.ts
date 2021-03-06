import RxDB from "rxdb";

import {VisicraftDatastore, VisicraftCollections} from "./datastore";

RxDB.plugin(require("pouchdb-adapter-idb"));
RxDB.plugin(require("pouchdb-adapter-memory"));

/**
 * Represents the interface of options used to configured the initialized datastore
 */
export interface IDatastoreOptions {
    /**
     * Represents what type of adapter will be used for persistence, (check out plugins for RxDB)
     */
    adapter?: string;

    /**
     * Represents the namespace that the datastore will be persisted as
     */
    namespace?: string;
}

/**
 * Represents the interface of options used to configure a `VisicraftClient` instance
 */
export interface IVisicraftClientOptions {
    /**
     * Represents the options passed into configuring the datastore
     */
    datastore?: IDatastoreOptions;
}

/**
 * Represents the normalized options used to configure the initialized datastore
 */
export class DatastoreOptions implements IDatastoreOptions {
    adapter = "memory";

    namespace = "visicraft_v1";

    /**
     * Constructor for `DatastoreOptions`
     */
    constructor(options: IDatastoreOptions = {}) {
        Object.assign(this, options);
    }
}

/**
 * Represents the options used to configure a `VisicraftClient` instance
 */
export class VisicraftClientOptions implements IVisicraftClientOptions {
    datastore: DatastoreOptions;

    /**
     * Constructor for `VisicraftClientOptions`
     */
    constructor(options: IVisicraftClientOptions = {}) {
        this.datastore = new DatastoreOptions(options.datastore);
    }

    /**
     * Returns the initialized datastore instance
     */
    create_datastore(): Promise<VisicraftDatastore> {
        const {adapter, namespace} = this.datastore;

        return RxDB.create<VisicraftCollections>({
            adapter: adapter,
            name: namespace,
            queryChangeDetection: true
        });
    }
}
