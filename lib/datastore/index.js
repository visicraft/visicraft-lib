"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var races_1 = require("./races");
/**
 * Creates the various collections on the datastores, if they don't already exist
 */
function create_collections(datastore) {
    var promise = Promise.all([races_1.create_collection(datastore)]);
    return promise;
}
exports.create_collections = create_collections;
//# sourceMappingURL=index.js.map