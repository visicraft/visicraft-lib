"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
Object.defineProperty(exports, "__esModule", { value: true });
var datastore_1 = require("./datastore");
var visicraft_client_options_1 = require("./visicraft_client_options");
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
        this.options = new visicraft_client_options_1.VisicraftClientOptions(opts);
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
                        return [4 /*yield*/, datastore_1.create_collections(datastore)];
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
exports.VisicraftClient = VisicraftClient;
//# sourceMappingURL=visicraft_client.js.map