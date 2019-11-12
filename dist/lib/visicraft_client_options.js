"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// HACK: Due to current Rollup not working well with packaging up RxDB,
// `visicraft-lib` supports utilizing the browserify build that populates `window.*`
var RxDB = (function () {
    if (typeof window !== "undefined") {
        var _RxDB = window.RxDB;
        if (_RxDB)
            return _RxDB;
        throw new Error("bad import from 'visicraft-lib' (could not locate 'rxdb')");
    }
    return require("rxdb");
})();
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
        return RxDB.create({
            adapter: adapter,
            name: namespace,
            queryChangeDetection: true
        });
    };
    return VisicraftClientOptions;
}());
exports.VisicraftClientOptions = VisicraftClientOptions;
//# sourceMappingURL=visicraft_client_options.js.map