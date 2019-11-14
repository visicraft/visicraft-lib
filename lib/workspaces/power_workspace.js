"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var workspace_1 = require("./workspace");
/**
 * Represents the class for interacting with a "Workspace" focusing on "Powers"
 */
var PowerWorkspace = /** @class */ (function (_super) {
    __extends(PowerWorkspace, _super);
    function PowerWorkspace() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns the current state of the `PowerWorkspace` instance
     */
    PowerWorkspace.prototype.get_state = function () {
        return __assign({}, this.state);
    };
    /**
     * Updates the current state of the `PowerWorkspace` instance
     * @param state -
     */
    PowerWorkspace.prototype.set_state = function (state) {
        this.state = state;
    };
    return PowerWorkspace;
}(workspace_1.Workspace));
exports.PowerWorkspace = PowerWorkspace;
//# sourceMappingURL=power_workspace.js.map