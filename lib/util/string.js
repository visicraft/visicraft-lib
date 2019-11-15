"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns an escaped variant of the provided string, that is safe for Regex
 */
function escape_regex(string) {
    // source: https://stackoverflow.com/a/6969486
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}
exports.escape_regex = escape_regex;
//# sourceMappingURL=string.js.map