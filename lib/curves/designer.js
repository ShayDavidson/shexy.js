'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Designer = undefined;

var _vector = require('utils/vector');

var _iterators = require('utils/iterators');

var _object = require('utils/object');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_HEX_OPTIONS = {
    radius: 20,
    scaleX: 1,
    scaleY: 1
};

/**
* The ratio between half the height of the hex to its radius,
* which actually equals sqrt(3)/2.
**/
var HEX_RATIO = 0.866;

var NORMALIZED_HEX_COORDINATES = [new _vector.Vector(-0.5, -HEX_RATIO), new _vector.Vector(0.5, -HEX_RATIO), new _vector.Vector(1, 0), new _vector.Vector(0.5, HEX_RATIO), new _vector.Vector(-0.5, HEX_RATIO), new _vector.Vector(-1, 0)];

var Designer = exports.Designer = function () {
    function Designer() {
        _classCallCheck(this, Designer);
    }

    _createClass(Designer, null, [{
        key: 'getHexVertices',
        value: function getHexVertices() {
            var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            options = _extends(DEFAULT_HEX_OPTIONS, options);

            return NORMALIZED_HEX_COORDINATES.map(function (vector) {
                return vector.multiplyXY(options.radius * options.scaleX, options.radius * options.scaleY);
            });
        }
    }, {
        key: 'getBoardHexCenters',
        value: function getBoardHexCenters(cols, rows) {
            var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

            options = (0, _object.deepMerge)({
                baseX: 0,
                baseY: 0,
                padding: 0,
                hex: DEFAULT_HEX_OPTIONS
            }, options);

            var xHexMultiplier = options.hex.radius * options.hex.scaleX;
            var yHexMultiplier = options.hex.radius * HEX_RATIO * options.hex.scaleY;

            return (0, _iterators.colRowMapIterator)(cols, rows, function (col, row) {
                var hexX = xHexMultiplier * (1 + 1.5 * col);
                var hexY = yHexMultiplier * (1 + col % 2 + 2 * row);
                var paddingX = options.padding * (col + 1);
                var paddingY = options.padding * (row + 1 + col % 2 * 0.5);
                var centerX = options.baseX + hexX + paddingX;
                var centerY = options.baseY + hexY + paddingY;
                return new _vector.Vector(centerX, centerY);
            });
        }
    }]);

    return Designer;
}();
//# sourceMappingURL=designer.js.map