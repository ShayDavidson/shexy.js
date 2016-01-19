'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isObject = isObject;
exports.deepMerge = deepMerge;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Simple is object check.
 * @param {*} item The value to check if it's an object or not.
 * @returns {Boolean} True if the given value is an object.
 */
function isObject(item) {
    return item && (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && !Array.isArray(item) && item !== null;
}

/**
 * Deep merge two objects.
 * @param {Object} target target object.
 * @param {Object} source source object.
 * @returns {Object} Deep merged object (source into target).
 */
function deepMerge(target, source) {
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(function (key) {
            if (isObject(source[key])) {
                if (!target[key]) {
                    _extends(target, _defineProperty({}, key, {}));
                }
                deepMerge(target[key], source[key]);
            } else {
                _extends(target, _defineProperty({}, key, source[key]));
            }
        });
    }
    return target;
}
//# sourceMappingURL=object.js.map