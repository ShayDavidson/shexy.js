'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Hex = undefined;

var _direction = require('utils/direction');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Hex = exports.Hex = function () {
    function Hex(row, col) {
        _classCallCheck(this, Hex);

        this.row = row;
        this.col = col;
        this._adjacents = {};
    }

    _createClass(Hex, [{
        key: 'connectAdajacent',
        value: function connectAdajacent(hex, dir) {
            if (hex && !this._adjacents[dir]) {
                this._adjacents[dir] = hex;
                hex.connectAdajacent(this, _direction.Direction.getOpposite(dir));
            }
        }
    }]);

    return Hex;
}();
//# sourceMappingURL=hex.js.map