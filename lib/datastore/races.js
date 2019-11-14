"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RACE_COLLECTION_METHODS = {};
exports.RACE_DOCUMENT_METHODS = {};
exports.RACE_DOCUMENT_SCHEMA = {
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
        methods: exports.RACE_DOCUMENT_METHODS,
        schema: exports.RACE_DOCUMENT_SCHEMA,
        statics: exports.RACE_COLLECTION_METHODS
    });
}
exports.create_collection = create_collection;
//# sourceMappingURL=races.js.map