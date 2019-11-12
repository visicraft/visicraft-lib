"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lowdb_1 = require("lowdb");
var LocalStorage_1 = require("lowdb/adapters/LocalStorage");
var Component = /** @class */ (function () {
    /**
     * Constructor for `Component`
     */
    function Component(client) {
        /**
         * Represents the data identifier of the `Component`
         */
        this.component_name = "component";
        var adapter = new LocalStorage_1.default(this.component_name);
        this.client = client;
        this.datastore = lowdb_1.default(adapter);
    }
    /**
     * Loads the current datastore from context storage
     */
    Component.prototype.load_datastore = function () {
        this.datastore.read();
    };
    /**
     * Saves the current datastore to context storage
     */
    Component.prototype.save_datastore = function () {
        this.datastore.write();
    };
    /**
     * Returns a prepared query for interacting with the datastore
     */
    Component.prototype.query_datastore = function () {
        return this.datastore.get(this.component_name);
    };
    return Component;
}());
exports.Component = Component;
//# sourceMappingURL=component.js.map