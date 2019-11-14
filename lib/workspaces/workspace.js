"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents a generic base-class of `IWorkspace`, for subclassing with
 */
var Workspace = /** @class */ (function () {
    /**
     * Represents the constructor for `Workspace`
     * @param client -
     */
    function Workspace(client, state) {
        this.client = client;
        if (state)
            this.set_state(state);
    }
    /**
     * Returns the current state of the `Workspace`, for serialization
     */
    Workspace.prototype.get_state = function () {
        throw TypeError("bad dispatch to 'get_state' (not implemented)");
    };
    /**
     * Sets the current state of the `Workspace`, for loading previous serialization
     */
    Workspace.prototype.set_state = function (state) {
        throw TypeError("bad dispatch to 'set_state' (not implemented)");
    };
    return Workspace;
}());
exports.Workspace = Workspace;
//# sourceMappingURL=workspace.js.map