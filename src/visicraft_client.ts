import {VisicraftDatastore, create_collections} from "./datastore";
import {IVisicraftClientOptions, VisicraftClientOptions} from "./visicraft_client_options";

/**
 * Represents the class used for base functionality of Visicraft clients
 */
export class VisicraftClient {
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
    constructor(opts: IVisicraftClientOptions = {}) {
        this.options = new VisicraftClientOptions(opts);
    }

    /**
     * Closes the connection to the current datastore
     */
    async close_datastore(): Promise<boolean> {
        const datastore = this.get_datastore();

        const destroyed = await datastore.destroy();
        if (destroyed) this.datastore = undefined;

        return destroyed;
    }

    /**
     * Initializes a new connection to the configured datastore
     */
    async open_datastore(): Promise<VisicraftDatastore> {
        if (this.datastore) {
            throw new Error(
                "bad dispatch to 'VisicraftClient.open_datastore' (datastore already initialized)"
            );
        }

        const datastore = await this.options.create_datastore();
        await create_collections(datastore);

        this.datastore = datastore;
        return datastore;
    }

    /**
     * Returns the current datastore connection, if any, otherwise throws an exception
     */
    get_datastore(): VisicraftDatastore {
        if (this.datastore) return this.datastore;

        throw new Error("bad dispatch to 'get_datastore' (datastore not initialized)");
    }
}
