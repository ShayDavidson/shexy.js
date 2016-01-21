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

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _designer = __webpack_require__(1);
	
	var _board = __webpack_require__(5);
	
	var _hex = __webpack_require__(6);
	
	var _canvas = __webpack_require__(8);
	
	var CanvasUtils = _interopRequireWildcard(_canvas);
	
	var _direction = __webpack_require__(7);
	
	var Direction = _interopRequireWildcard(_direction);
	
	var _iterators = __webpack_require__(3);
	
	var Iterators = _interopRequireWildcard(_iterators);
	
	var _object = __webpack_require__(4);
	
	var ObjectUtils = _interopRequireWildcard(_object);
	
	var _vector = __webpack_require__(2);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	exports.default = {
	    Designer: _designer.Designer,
	    Board: _board.Board,
	    Hex: _hex.Hex,
	    Direction: Direction,
	    Iterators: Iterators,
	    ObjectUtils: ObjectUtils,
	    CanvasUtils: CanvasUtils,
	    Vector: _vector.Vector
	};
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Designer = undefined;
	
	var _vector = __webpack_require__(2);
	
	var _iterators = __webpack_require__(3);
	
	var _object = __webpack_require__(4);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DEFAULT_HEX_OPTIONS = {
	    centerX: 0,
	    centerY: 0,
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
	
	            var xMultiplier = options.radius * options.scaleX;
	            var yMultiplier = options.radius * options.scaleY;
	            return NORMALIZED_HEX_COORDINATES.map(function (vector) {
	                return vector.multiplyXY(xMultiplier, yMultiplier).addXY(options.centerX, options.centerY);
	            });
	        }
	    }, {
	        key: 'getBoardHexCenters',
	        value: function getBoardHexCenters(cols, rows) {
	            var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	            options = (0, _object.deepMerge)({
	                baseX: 0,
	                baseY: 0,
	                hex: DEFAULT_HEX_OPTIONS,
	                padding: 0
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

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Vector = exports.Vector = function () {
	    function Vector() {
	        var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	        var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	
	        _classCallCheck(this, Vector);
	
	        this.x = x;
	        this.y = y;
	    }
	
	    _createClass(Vector, [{
	        key: "addXY",
	        value: function addXY(xAddition, yAddition) {
	            return new Vector(this.x + xAddition, this.y + yAddition);
	        }
	    }, {
	        key: "multiplyXY",
	        value: function multiplyXY(xMultiplier, yMultiplier) {
	            return new Vector(this.x * xMultiplier, this.y * yMultiplier);
	        }
	    }]);
	
	    return Vector;
	}();

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.colRowIterator = colRowIterator;
	exports.colRowMapIterator = colRowMapIterator;
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
	
	/**
	* Given a number of columns and rows, this iterator goes over each
	* column-row pair and sends then as arguments to the `handler` argument.
	* @param {Integer} cols Number of columns to iterate over.
	* @param {Integer} rows Number of rows to iterate over.
	* @param {rowColHandler} handler A handler for each step of the iteration.
	* @returns {undefined}
	*/
	function colRowIterator(cols, rows, handler) {
	    for (var col = 0; col < cols; col++) {
	        for (var row = 0; row < rows; row++) {
	            handler(col, row);
	        }
	    }
	}
	
	/**
	* Given a number of columns and rows, this iterator goes over each
	* column-row pair and sends then as arguments to the `handler` argument.
	* @param {Integer} cols Number of columns to iterate over.
	* @param {Integer} rows Number of rows to iterate over.
	* @param {rowColMapFunction} mapFunction A map function that returns the mapped value.
	* @returns {Array<Array[]>} The mapping result.
	*/
	function colRowMapIterator(cols, rows, mapFunction) {
	    var matrix = new Array(cols);
	    colRowIterator(cols, rows, function (col, row) {
	        matrix[col] || (matrix[col] = new Array(rows));
	        matrix[col][row] = mapFunction(col, row);
	    });
	    return matrix;
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

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

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Board = undefined;
	
	var _hex = __webpack_require__(6);
	
	var _direction = __webpack_require__(7);
	
	var _iterators = __webpack_require__(3);
	
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

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Hex = undefined;
	
	var _direction = __webpack_require__(7);
	
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

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getOpposite = getOpposite;
	var ENUM = exports.ENUM = {
	    top: 0,
	    topRight: 1,
	    botRight: 2,
	    bot: 3,
	    botLeft: 4,
	    topLeft: 5
	};
	
	function getOpposite(dir) {
	    return (dir + 3) % 6;
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.drawPolygon = drawPolygon;
	function drawPolygon(ctx, vertices, options) {
	    ctx.beginPath();
	    ctx.moveTo(vertices[0].x, vertices[0].y);
	    for (var i = 1; i < vertices.length; i++) {
	        ctx.lineTo(vertices[i].x, vertices[i].y);
	    }
	    ctx.lineTo(vertices[0].x, vertices[0].y);
	
	    if (options.fillStyle) {
	        ctx.fillStyle = options.fillStyle;
	        ctx.fill();
	    }
	    ctx.lineWidth = options.strokeWidth || 1;
	    ctx.strokeStyle = options.strokeStyle || 'black';
	    ctx.stroke();
	}

/***/ }
/******/ ]);
//# sourceMappingURL=shexy.js.map