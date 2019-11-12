/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var RACE_COLLECTION_METHODS = {};
var RACE_DOCUMENT_METHODS = {};
var RACE_DOCUMENT_SCHEMA = {
    title: "races",
    description: "Schema for validating internally stored WCS Races",
    version: 0,
    keyCompression: true,
    required: ["description", "summary", "title"],
    type: "object",
    properties: {
        identifier: {
            type: "string",
            primary: true
        },
        description: { type: "string" },
        summary: { type: "string" },
        title: { type: "string" }
    }
};
/**
 * Creates the Race collection on the datastore, if not previously existed
 */
function create_collection(datastore) {
    return datastore.collection({
        name: "races",
        methods: RACE_DOCUMENT_METHODS,
        schema: RACE_DOCUMENT_SCHEMA,
        statics: RACE_COLLECTION_METHODS
    });
}

/**
 * Creates the various collections on the datastores, if they don't already exist
 */
function create_collections(datastore) {
    var promise = Promise.all([create_collection(datastore)]);
    return promise;
}

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

/**
 * Represents the class used for base functionality of Visicraft clients
 */
var VisicraftClient = /** @class */ (function () {
    /**
     * Constructor for `VisicraftClient`
     * @param opts - Configurable options to pass in
     */
    function VisicraftClient(opts) {
        if (opts === void 0) { opts = {}; }
        this.options = new VisicraftClientOptions(opts);
    }
    /**
     * Closes the connection to the current datastore
     */
    VisicraftClient.prototype.close_datastore = function () {
        return __awaiter(this, void 0, void 0, function () {
            var datastore, destroyed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        datastore = this.get_datastore();
                        return [4 /*yield*/, datastore.destroy()];
                    case 1:
                        destroyed = _a.sent();
                        if (destroyed)
                            this.datastore = undefined;
                        return [2 /*return*/, destroyed];
                }
            });
        });
    };
    /**
     * Initializes a new connection to the configured datastore
     */
    VisicraftClient.prototype.open_datastore = function () {
        return __awaiter(this, void 0, void 0, function () {
            var datastore;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.datastore) {
                            throw new Error("bad dispatch to 'VisicraftClient.open_datastore' (datastore already initialized)");
                        }
                        return [4 /*yield*/, this.options.create_datastore()];
                    case 1:
                        datastore = _a.sent();
                        return [4 /*yield*/, create_collections(datastore)];
                    case 2:
                        _a.sent();
                        this.datastore = datastore;
                        return [2 /*return*/, datastore];
                }
            });
        });
    };
    /**
     * Returns the current datastore connection, if any, otherwise throws an exception
     */
    VisicraftClient.prototype.get_datastore = function () {
        if (this.datastore)
            return this.datastore;
        throw new Error("bad dispatch to 'get_datastore' (datastore not initialized)");
    };
    return VisicraftClient;
}());

export { DatastoreOptions, VisicraftClient, VisicraftClientOptions };
//# sourceMappingURL=visicraft-lib.es5.js.map
