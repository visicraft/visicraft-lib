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
var crypto_hash_1 = require("crypto-hash");
var slugify_1 = require("slugify");
var content_1 = require("../util/content");
exports.RACE_COLLECTION_METHODS = {};
exports.RACE_DOCUMENT_METHODS = {};
/**
 * Represents the JSON Schema for validating Races and creating the datastore Collection
 */
exports.RACE_DOCUMENT_SCHEMA = {
    title: "races",
    description: "Schema for validating internally stored WCS Races",
    version: 0,
    keyCompression: true,
    required: ["contributors", "description", "summary", "title"],
    type: "object",
    properties: {
        identifier: {
            type: "string",
            primary: true
        },
        description: { type: "string" },
        summary: { type: "string" },
        content_type: {
            type: "string",
            index: true,
            final: true,
            enum: [content_1.CONTENT_TYPES.races]
        },
        contributors: {
            type: "array",
            final: true,
            items: { type: "string" }
        },
        title: {
            type: "string",
            index: true
        }
    }
};
/**
 * Prepares Race data before insertion into the datastore
 */
function on_pre_insert(data) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // Every Race needs a identifier generated from their metadata
                    _a = data;
                    return [4 /*yield*/, generate_identifier(data)];
                case 1:
                    // Every Race needs a identifier generated from their metadata
                    _a.identifier = _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Prepares Race data before every mutation into the datastore
 */
function on_pre_save(data) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // Every Race needs a identifier generated from their metadata
                    _a = data;
                    return [4 /*yield*/, generate_identifier(data)];
                case 1:
                    // Every Race needs a identifier generated from their metadata
                    _a.identifier = _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Returns the hash hex identifier for the given Race
 *
 * Algorithm:
 *  sha1( slugify(.title) + map(.contributors, slugify).sort() )
 */
function generate_identifier(data) {
    var contributors = data.contributors, title = data.title;
    contributors = contributors.map(function (contributor) { return slugify_1.default(contributor); });
    contributors.sort();
    var _contributors = contributors.join("");
    title = slugify_1.default(title);
    return crypto_hash_1.sha1(title + contributors);
}
exports.generate_identifier = generate_identifier;
/**
 * Creates the Race collection on the datastore, if not previously existed
 */
function create_collection(datastore) {
    return __awaiter(this, void 0, void 0, function () {
        var collection;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, datastore.collection({
                        name: "races",
                        methods: exports.RACE_DOCUMENT_METHODS,
                        schema: exports.RACE_DOCUMENT_SCHEMA,
                        statics: exports.RACE_COLLECTION_METHODS
                    })];
                case 1:
                    collection = _a.sent();
                    collection.preInsert(on_pre_insert, false);
                    collection.preSave(on_pre_save, false);
                    return [2 /*return*/];
            }
        });
    });
}
exports.create_collection = create_collection;
//# sourceMappingURL=races.js.map