import * as RxDB_namespace from "rxdb";

import {VisicraftDatastore, VisicraftCollections} from "./datastore";

// HACK: Due to current Rollup not working well with packaging up RxDB,
// `visicraft-lib` supports utilizing the browserify build that populates `window.*`
const RxDB = (function(): typeof RxDB_namespace {
    if (typeof window !== "undefined") {
        const _RxDB: typeof RxDB_namespace = (<any>window).RxDB;
        if (_RxDB) return _RxDB;

        throw new Error("bad import from 'visicraft-lib' (could not locate 'rxdb')");
    }

    return require("rxdb");
})();

// Allow `rxdb` to utilize memory as a datastore
//const adapter: any = require("pouchdb-adapter-memory/lib/index.es");
//RxDB.plugin(adapter);

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
