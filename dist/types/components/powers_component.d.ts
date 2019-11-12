import { Component } from "./component";
/**
 * Represents the typing of a singular "Power"
 */
export interface IPower {
    /**
     * Represents the identifier of the "Power"
     */
    id: string;
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
 * Represents the `Component` for working with "Powers"
 */
export declare class PowersComponent extends Component<IPower> {
    component_name: string;
}
