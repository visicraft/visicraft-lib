import { Workspace } from "./workspace";
/**
 * Represents a state for the `PowerWorkspace` class
 */
export interface IPowerState {
    /**
     * Represents the description of the "Power"
     */
    description: string;
    /**
     * Represents the title of the "Power"
     */
    title: string;
}
/**
 * Represents the class for interacting with a "Workspace" focusing on "Powers"
 */
export declare class PowerWorkspace extends Workspace<IPowerState> {
    /**
     * Returns the current state of the `PowerWorkspace` instance
     */
    get_state(): IPowerState;
    /**
     * Updates the current state of the `PowerWorkspace` instance
     * @param state -
     */
    set_state(state: IPowerState): void;
}
