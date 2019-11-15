"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents each supported Content Type that Visicraft can consume
 */
var CONTENT_TYPES;
(function (CONTENT_TYPES) {
    /**
     * Represents the Content Type for Visicraft Powers
     */
    CONTENT_TYPES["powers"] = "TYPE_POWER";
    /**
     * Represents the Content Type for WCS Races
     */
    CONTENT_TYPES["races"] = "TYPE_RACE";
    /**
     * Represents the Content Type for WCS Shop Items
     */
    CONTENT_TYPES["shopitems"] = "TYPE_SHOPITEM";
})(CONTENT_TYPES = exports.CONTENT_TYPES || (exports.CONTENT_TYPES = {}));
/**
 * Represents the various sorting directions supported by the UI
 */
var SORTING_DIRECTIONS;
(function (SORTING_DIRECTIONS) {
    /**
     * Represents the sorting should happen via ascending, e.g. A-Z
     */
    SORTING_DIRECTIONS["ascending"] = "DIRECTION_ASCEND";
    /**
     * Represents the sorting should happen via decending, e.g. Z-A
     */
    SORTING_DIRECTIONS["decending"] = "DIRECTION_DECEND";
})(SORTING_DIRECTIONS = exports.SORTING_DIRECTIONS || (exports.SORTING_DIRECTIONS = {}));
/**
 * Represents the various sorting modes supported by the UI
 */
var SORTING_MODES;
(function (SORTING_MODES) {
    /**
     * Represents that sorting should happen via alphabetically, e.g. A-Z
     */
    SORTING_MODES["alphabetical"] = "MODE_ALPHABETICAL";
    /**
     * Represents that sorting should happen via an approximation of recentness, e.g. which file was most recently updated
     */
    SORTING_MODES["recent"] = "MODE_RECENT";
})(SORTING_MODES = exports.SORTING_MODES || (exports.SORTING_MODES = {}));
//# sourceMappingURL=constants.js.map