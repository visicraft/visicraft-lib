import { VisicraftDatastore } from "./datastore";
import { IVisicraftClientOptions, VisicraftClientOptions } from "./visicraft_client_options";
/**
 * Represents the class used for base functionality of Visicraft clients
 */
export declare class VisicraftClient {
    /**
     * Represents the initialized datastore, if previously opened
     */
    datastore?: VisicraftDatastore;
    /**
     * Represents the options that `VisicraftClient` was constructed with
     */
    options: VisicraftClientOptions;
    /**
     * Constructor for `VisicraftClient`
     * @param opts - Configurable options to pass in
     */
    constructor(opts?: IVisicraftClientOptions);
    /**
     * Closes the connection to the current datastore
     */
    close_datastore(): Promise<boolean>;
    /**
     * Initializes a new connection to the configured datastore
     */
    open_datastore(): Promise<VisicraftDatastore>;
    /**
     * Returns the current datastore connection, if any, otherwise throws an exception
     */
    get_datastore(): VisicraftDatastore;
}
