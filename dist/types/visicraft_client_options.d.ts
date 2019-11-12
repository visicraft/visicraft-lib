import { VisicraftDatastore } from "./datastore";
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
export declare class DatastoreOptions implements IDatastoreOptions {
    adapter: string;
    namespace: string;
    /**
     * Constructor for `DatastoreOptions`
     */
    constructor(options?: IDatastoreOptions);
}
/**
 * Represents the options used to configure a `VisicraftClient` instance
 */
export declare class VisicraftClientOptions implements IVisicraftClientOptions {
    datastore: DatastoreOptions;
    /**
     * Constructor for `VisicraftClientOptions`
     */
    constructor(options?: IVisicraftClientOptions);
    /**
     * Returns the initialized datastore instance
     */
    create_datastore(): Promise<VisicraftDatastore>;
}
