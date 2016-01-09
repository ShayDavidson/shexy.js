var Shexy =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _curvesIndexEs6 = __webpack_require__(1);
	
	var _curvesIndexEs62 = _interopRequireDefault(_curvesIndexEs6);
	
	var _bodyIndexEs6 = __webpack_require__(2);
	
	var _bodyIndexEs62 = _interopRequireDefault(_bodyIndexEs6);
	
	exports["default"] = {
	    Body: _bodyIndexEs62["default"],
	    Curves: _curvesIndexEs62["default"]
	};
	module.exports = exports["default"];

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	// class Point {
	//     constructor(x = 0, y = 0) {
	//         this.x = x;
	//         this.y = y;
	//     }
	//
	//     multiply(val) {
	//         return new Point(this.x * val, this.y * val);
	//     }
	// }
	//
	// const NORMALIZED_HEX_COORDINATES = [
	//     new Point(-0.5, -0.866),
	//     new Point(0.5, -0.866),
	//     new Point(1, 0),
	//     new Point(0.5, 0.866),
	//     new Point(-0.5, 0.866),
	//     new Point(-1, 0),
	// ];
	//
	// export default {
	//     drawHex(options) {
	//         let points = NORMALIZED_HEX_COORDINATES.map((point) => {
	//             return point.multiply(options.radius);
	//         });
	//     }
	// };

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = {
	    Board: __webpack_require__(3),
	    Hex: __webpack_require__(4)
	};
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _hex = __webpack_require__(4);
	
	var _hex2 = _interopRequireDefault(_hex);
	
	var _direction = __webpack_require__(5);
	
	var _direction2 = _interopRequireDefault(_direction);
	
	var Board = (function () {
	
		/**
	  * @param {Object} options
	  * @param {Integer} options.rows Number of rows in the board
	  * @param {Integer} options.cols Number of columns in the board
	  */
	
		function Board() {
			var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
			_classCallCheck(this, Board);
	
			this.options = options;
			this._constructHexMatrix();
			this._connectHexMatrix();
		}
	
		_createClass(Board, [{
			key: 'get',
			value: function get(row, col) {
				if (this._hexMatrix[row]) {
					return this._hexMatrix[row][col];
				}
			}
		}, {
			key: 'each',
			value: function each(func) {
				for (var rowIndex = 0; rowIndex < this.options.rows; rowIndex++) {
					for (var colIndex = 0; colIndex < this.options.cols; colIndex++) {
						func.call(this, rowIndex, colIndex, this._hexMatrix[rowIndex][colIndex]);
					}
				}
			}
		}, {
			key: '_constructHexMatrix',
			value: function _constructHexMatrix() {
				var _this = this;
	
				this._hexMatrix = new Array(this.options.rows).fill(new Array(this.options.cols).fill(0));
				this.each(function (row, col) {
					_this._hexMatrix[row][col] = new _hex2['default'](row, col);
				});
			}
		}, {
			key: '_connectHexMatrix',
			value: function _connectHexMatrix() {
				var _this2 = this;
	
				this.each(function (row, col, hex) {
					var oddColDiff = col % 2 == 0 ? 1 : 0;
					hex.connectAdajacent(_this2.get(row + 1, col), _direction2['default'].BOT);
					hex.connectAdajacent(_this2.get(row + oddColDiff, col + 1), _direction2['default'].BOT_RIGHT);
					hex.connectAdajacent(_this2.get(row - 1 + oddColDiff, col + 1), _direction2['default'].TOP_RIGHT);
				});
			}
		}]);
	
		return Board;
	})();
	
	exports['default'] = Board;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _direction = __webpack_require__(5);
	
	var _direction2 = _interopRequireDefault(_direction);
	
	var Hex = (function () {
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
					hex.connectAdajacent(this, _direction2['default'].getOpposite(dir));
				}
			}
		}]);
	
		return Hex;
	})();
	
	exports['default'] = Hex;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports["default"] = {
		TOP: 0,
		TOP_RIGHT: 1,
		BOT_RIGHT: 2,
		BOT: 3,
		BOT_LEFT: 4,
		TOP_LEFT: 5,
	
		getOpposite: function getOpposite(dir) {
			return (dir + 3) % 6;
		}
	};
	module.exports = exports["default"];

/***/ }
/******/ ]);
//# sourceMappingURL=shexy.js.map