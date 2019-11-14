"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxdb_1 = require("rxdb");
var adapter = require("pouchdb-adapter-memory");
rxdb_1.default.plugin(adapter);
/**
 * Represents the normalized options used to configure the initialized datastore
 */
var DatastoreOptions = /** @class */ (function () {
    /**
     * Constructor for `DatastoreOptions`
     */
    function DatastoreOptions(options) {
        if (options === void 0) { options = {}; }
        this.adapter = "memory";
        this.namespace = "visicraft_v1";
        Object.assign(this, options);
    }
    return DatastoreOptions;
}());
exports.DatastoreOptions = DatastoreOptions;
/**
 * Represents the options used to configure a `VisicraftClient` instance
 */
var VisicraftClientOptions = /** @class */ (function () {
    /**
     * Constructor for `VisicraftClientOptions`
     */
    function VisicraftClientOptions(options) {
        if (options === void 0) { options = {}; }
        this.datastore = new DatastoreOptions(options.datastore);
    }
    /**
     * Returns the initialized datastore instance
     */
    VisicraftClientOptions.prototype.create_datastore = function () {
        var _a = this.datastore, adapter = _a.adapter, namespace = _a.namespace;
        return rxdb_1.default.create({
            adapter: adapter,
            name: namespace,
            queryChangeDetection: true
        });
    };
    return VisicraftClientOptions;
}());
exports.VisicraftClientOptions = VisicraftClientOptions;
//# sourceMappingURL=visicraft_client_options.js.map