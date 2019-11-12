import { VisicraftClient } from "../visicraft_client";
/**
 * Represents the implementation interface of a `Workspace` compatible class
 */
export interface IWorkspace<T> {
    /**
     * Represents the method for getting the current state of the `Workspace`
     */
    get_state(): T;
    /**
     * Represents the method for setting the current state of the `Workspace`
     */
    set_state(state: T): void;
}
/**
 * Represents a generic base-class of `IWorkspace`, for subclassing with
 */
export declare class Workspace<T> implements IWorkspace<T> {
    /**
     * Represents the parent `VisicraftClient` that controls the `Workspace`
     */
    client: VisicraftClient;
    /**
     * Represents the current state of the `Workspace`
     */
    state: T;
    /**
     * Represents the constructor for `Workspace`
     * @param client -
     */
    constructor(client: VisicraftClient, state?: T);
    /**
     * Returns the current state of the `Workspace`, for serialization
     */
    get_state(): T;
    /**
     * Sets the current state of the `Workspace`, for loading previous serialization
     */
    set_state(state: T): void;
}
