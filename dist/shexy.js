(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Shexy"] = factory();
	else
		root["Shexy"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = {
	    // Curves (AKA Drawing)
	    Designer: __webpack_require__(1),
	    // Models
	    Board: __webpack_require__(4),
	    Hex: __webpack_require__(5),
	    // Utils
	    Direction: __webpack_require__(6),
	    Vector: __webpack_require__(2)
	};
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _utilsVector = __webpack_require__(2);
	
	var _utilsVector2 = _interopRequireDefault(_utilsVector);
	
	var _utilsIterators = __webpack_require__(3);
	
	var DEFAULTS = {
	    padding: 0,
	    radius: 20,
	    scale: 1
	};
	var NORMALIZED_HEX_COORDINATES = [new _utilsVector2['default'](-0.5, -0.866), new _utilsVector2['default'](0.5, -0.866), new _utilsVector2['default'](1, 0), new _utilsVector2['default'](0.5, 0.866), new _utilsVector2['default'](-0.5, 0.866), new _utilsVector2['default'](-1, 0)];
	
	exports['default'] = {
	
	    getHexVertices: function getHexVertices() {
	        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	        options = Object.assign({
	            radius: DEFAULTS.radius,
	            scaleX: DEFAULTS.scale,
	            scaleY: DEFAULTS.scale
	        }, options);
	
	        return NORMALIZED_HEX_COORDINATES.map(function (vector) {
	            return vector.multiplyXY(options.radius * options.scaleX, options.radius * options.scaleY);
	        });
	    },
	
	    getBoardHexCenters: function getBoardHexCenters(rows, cols) {
	        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	        options = Object.assign({
	            padding: DEFAULTS.padding,
	            hex: {
	                radius: DEFAULTS.radius,
	                scaleX: DEFAULTS.scale,
	                scaleY: DEFAULTS.scale
	            }
	        }, options);
	
	        (0, _utilsIterators.colRowIterator)(rows, cols, function (row, col) {
	            console.log(row, col);
	        });
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Vector = (function () {
	    function Vector() {
	        var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	        var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	
	        _classCallCheck(this, Vector);
	
	        this.x = x;
	        this.y = y;
	    }
	
	    _createClass(Vector, [{
	        key: "multiplyXY",
	        value: function multiplyXY(xMultiplier, yMultiplier) {
	            return new Vector(this.x * xMultiplier, this.y * yMultiplier);
	        }
	    }]);
	
	    return Vector;
	})();
	
	exports["default"] = Vector;
	module.exports = exports["default"];

/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	* @callback rowColHandler
	* @param {Integer} col The current column in the iteration step.
	* @param {Integer} row The current row in the iteration step.
	* @returns {undefined} Handler can return a value, but it'll not be used.
	*/
	
	/**
	* @callback rowColMapFunction
	* @param {Integer} col The current column in the iteration step.
	* @param {Integer} row The current row in the iteration step.
	* @returns {*} Mapped value.
	*/
	
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = {
	
	    /**
	    * Given a number of columns and rows, this iterator goes over each
	    * column-row pair and sends then as arguments to the `handler` argument.
	    * @param {Integer} cols Number of columns to iterate over.
	    * @param {Integer} rows Number of rows to iterate over.
	    * @param {rowColHandler} handler A handler for each step of the iteration.
	    * @returns {undefined}
	    */
	    colRowIterator: function colRowIterator(cols, rows, handler) {
	        for (var colIndex = 0; colIndex < cols; colIndex++) {
	            for (var rowIndex = 0; rowIndex < rows; rowIndex++) {
	                handler(colIndex, rowIndex);
	            }
	        }
	    },
	
	    /**
	    * Given a number of columns and rows, this iterator goes over each
	    * column-row pair and sends then as arguments to the `handler` argument.
	    * @param {Integer} cols Number of columns to iterate over.
	    * @param {Integer} rows Number of rows to iterate over.
	    * @param {rowColMapFunction} mapFunction A map function that returns the mapped value.
	    * @returns {Array<Array[]>} The mapping result.
	    */
	    colRowMapIterator: function colRowMapIterator(cols, rows, mapFunction) {
	        var matrix = new Array(cols).fill(new Array(rows));
	        module.exports.colRowIterator(cols, rows, function (col, row) {
	            matrix[col][row] = mapFunction(col, row);
	        });
	        return matrix;
	    }
	};
	module.exports = exports["default"];

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
	
	var _hex = __webpack_require__(5);
	
	var _hex2 = _interopRequireDefault(_hex);
	
	var _utilsDirection = __webpack_require__(6);
	
	var _utilsDirection2 = _interopRequireDefault(_utilsDirection);
	
	var _utilsIterators = __webpack_require__(3);
	
	/**
	* @Class Board
	*/
	
	var Board = (function () {
	
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
	
	            (0, _utilsIterators.colRowIterator)(this.cols, this.rows, function (col, row) {
	                func.call(_this, col, row, _this.get(col, row));
	            });
	        }
	    }, {
	        key: '_constructHexMatrix',
	        value: function _constructHexMatrix() {
	            this._hexMatrix = (0, _utilsIterators.colRowMapIterator)(this.cols, this.rows, function (col, row) {
	                return new _hex2['default'](col, row);
	            });
	        }
	    }, {
	        key: '_connectHexMatrix',
	        value: function _connectHexMatrix() {
	            var _this2 = this;
	
	            this.each(function (row, col, hex) {
	                var oddColDiff = col % 2 === 0 ? 1 : 0;
	                hex.connectAdajacent(_this2.get(row + 1, col), _utilsDirection2['default'].BOT);
	                hex.connectAdajacent(_this2.get(row + oddColDiff, col + 1), _utilsDirection2['default'].BOT_RIGHT);
	                hex.connectAdajacent(_this2.get(row - 1 + oddColDiff, col + 1), _utilsDirection2['default'].TOP_RIGHT);
	            });
	        }
	    }]);
	
	    return Board;
	})();
	
	exports['default'] = Board;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _utilsDirection = __webpack_require__(6);
	
	var _utilsDirection2 = _interopRequireDefault(_utilsDirection);
	
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
	                hex.connectAdajacent(this, _utilsDirection2['default'].getOpposite(dir));
	            }
	        }
	    }]);
	
	    return Hex;
	})();
	
	exports['default'] = Hex;
	module.exports = exports['default'];

/***/ },
/* 6 */
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
/******/ ])
});
;
//# sourceMappingURL=shexy.js.map