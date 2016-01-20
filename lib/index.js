'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Shexy = undefined;

var _designer = require('curves/designer');

var _designer2 = _interopRequireDefault(_designer);

var _board = require('models/board');

var _board2 = _interopRequireDefault(_board);

var _hex = require('models/hex');

var _hex2 = _interopRequireDefault(_hex);

var _direction = require('utils/direction');

var Direction = _interopRequireWildcard(_direction);

var _iterators = require('utils/iterators');

var Iterators = _interopRequireWildcard(_iterators);

var _object = require('utils/object');

var ObjectUtils = _interopRequireWildcard(_object);

var _vector = require('utils/vector');

var _vector2 = _interopRequireDefault(_vector);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Shexy = exports.Shexy = {
    Curves: {
        Designer: _designer2.default
    },
    Models: {
        Board: _board2.default,
        Hex: _hex2.default
    },
    Utils: {
        Direction: Direction,
        Vector: _vector2.default,
        Iterators: Iterators,
        ObjectUtils: ObjectUtils
    }
};
//# sourceMappingURL=index.js.map