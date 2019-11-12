import { LoDashExplicitWrapper } from "lodash";
import lowdb from "lowdb";
import { VisicraftClient } from "../visicraft_client";
/**
 * Represents implementation interface of a `Component` compatible class
 */
export interface IComponent {
    /**
     * Represents the method used for loading the datastore from context storage
     */
    load_datastore(): void;
    /**
     * Represents the method used for saving the current datastore to context storage
     */
    save_datastore(): void;
}
export declare class Component<T> implements IComponent {
    /**
     * Represents the data identifier of the `Component`
     */
    component_name: string;
    /**
     * Represents the parent `VisicraftClient` that `Component` is a child of
     */
    client: VisicraftClient;
    /**
     * Represents the currently loaded datastore
     */
    datastore: lowdb.LowdbSync<T>;
    /**
     * Constructor for `Component`
     */
    constructor(client: VisicraftClient);
    /**
     * Loads the current datastore from context storage
     */
    load_datastore(): void;
    /**
     * Saves the current datastore to context storage
     */
    save_datastore(): void;
    /**
     * Returns a prepared query for interacting with the datastore
     */
    query_datastore(): LoDashExplicitWrapper<T>;
}
