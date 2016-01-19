'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Board = undefined;

var _hex = require('hex');

var _direction = require('utils/direction');

var _iterators = require('utils/iterators');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* @Class Board
*/

var Board = exports.Board = function () {

    /**
    * @constructs Board
    * @param {Object} options Options object
    * @param {Integer} options.rows Number of rows in the board
    * @param {Integer} options.cols Number of columns in the board
    * @returns {Board} New Board object
    */

    function Board() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Board);

        this.options = options;
        this.cols = options.cols;
        this.rows = options.rows;
        this._constructHexMatrix();
        this._connectHexMatrix();
    }

    _createClass(Board, [{
        key: 'get',
        value: function get(col, row) {
            if (this._hexMatrix[col]) {
                return this._hexMatrix[col][row];
            }
        }
    }, {
        key: 'each',
        value: function each(func) {
            var _this = this;

            (0, _iterators.colRowIterator)(this.cols, this.rows, function (col, row) {
                func.call(_this, col, row, _this.get(col, row));
            });
        }
    }, {
        key: '_constructHexMatrix',
        value: function _constructHexMatrix() {
            this._hexMatrix = (0, _iterators.colRowMapIterator)(this.cols, this.rows, function (col, row) {
                return new _hex.Hex(col, row);
            });
        }
    }, {
        key: '_connectHexMatrix',
        value: function _connectHexMatrix() {
            var _this2 = this;

            this.each(function (row, col, hex) {
                var oddColDiff = col % 2 === 0 ? 1 : 0;
                hex.connectAdajacent(_this2.get(row + 1, col), _direction.Direction.BOT);
                hex.connectAdajacent(_this2.get(row + oddColDiff, col + 1), _direction.Direction.BOT_RIGHT);
                hex.connectAdajacent(_this2.get(row - 1 + oddColDiff, col + 1), _direction.Direction.TOP_RIGHT);
            });
        }
    }]);

    return Board;
}();
//# sourceMappingURL=board.js.map