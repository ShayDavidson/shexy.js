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
	
	var Designer = _interopRequireWildcard(_designer);
	
	var _board = __webpack_require__(5);
	
	var _hex = __webpack_require__(6);
	
	var _col_row = __webpack_require__(3);
	
	var _canvas = __webpack_require__(8);
	
	var CanvasUtils = _interopRequireWildcard(_canvas);
	
	var _direction = __webpack_require__(7);
	
	var Direction = _interopRequireWildcard(_direction);
	
	var _iterators = __webpack_require__(4);
	
	var Iterators = _interopRequireWildcard(_iterators);
	
	var _vector = __webpack_require__(2);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	exports.default = {
	    Designer: Designer,
	    Board: _board.Board,
	    Hex: _hex.Hex,
	    CanvasUtils: CanvasUtils,
	    ColRow: _col_row.ColRow,
	    Direction: Direction,
	    Iterators: Iterators,
	    Vector: _vector.Vector
	};
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getHexVertices = getHexVertices;
	exports.getHexCenter = getHexCenter;
	exports.getBoardHexCenters = getBoardHexCenters;
	exports.isInsideHex = isInsideHex;
	exports.getColRowFromPosition = getColRowFromPosition;
	
	var _vector = __webpack_require__(2);
	
	var _col_row = __webpack_require__(3);
	
	var _iterators = __webpack_require__(4);
	
	/**
	* The ratio between half the height of the hex to its radius,
	* which actually equals sqrt(3)/2.
	**/
	var HEX_RATIO = 0.866;
	
	var NORMALIZED_HEX_COORDINATES = [new _vector.Vector(-0.5, -HEX_RATIO), new _vector.Vector(0.5, -HEX_RATIO), new _vector.Vector(1, 0), new _vector.Vector(0.5, HEX_RATIO), new _vector.Vector(-0.5, HEX_RATIO), new _vector.Vector(-1, 0)];
	
	function getHexVertices(_ref) {
	    var _ref$centerX = _ref.centerX;
	    var centerX = _ref$centerX === undefined ? 0 : _ref$centerX;
	    var _ref$centerY = _ref.centerY;
	    var centerY = _ref$centerY === undefined ? 0 : _ref$centerY;
	    var _ref$scaleX = _ref.scaleX;
	    var scaleX = _ref$scaleX === undefined ? 1 : _ref$scaleX;
	    var _ref$scaleY = _ref.scaleY;
	    var scaleY = _ref$scaleY === undefined ? 1 : _ref$scaleY;
	    var _ref$radius = _ref.radius;
	    var radius = _ref$radius === undefined ? 10 : _ref$radius;
	
	    var xMultiplier = radius * scaleX;
	    var yMultiplier = radius * scaleY;
	
	    return NORMALIZED_HEX_COORDINATES.map(function (vector) {
	        return vector.multiplyXY(xMultiplier, yMultiplier).addXY(centerX, centerY);
	    });
	}
	
	function getHexCenter(col, row, _ref2) {
	    var _ref2$boardX = _ref2.boardX;
	    var boardX = _ref2$boardX === undefined ? 0 : _ref2$boardX;
	    var _ref2$boardY = _ref2.boardY;
	    var boardY = _ref2$boardY === undefined ? 0 : _ref2$boardY;
	    var _ref2$scaleX = _ref2.scaleX;
	    var scaleX = _ref2$scaleX === undefined ? 1 : _ref2$scaleX;
	    var _ref2$scaleY = _ref2.scaleY;
	    var scaleY = _ref2$scaleY === undefined ? 1 : _ref2$scaleY;
	    var _ref2$radius = _ref2.radius;
	    var radius = _ref2$radius === undefined ? 10 : _ref2$radius;
	    var _ref2$padding = _ref2.padding;
	    var padding = _ref2$padding === undefined ? 0 : _ref2$padding;
	
	    var xHexMultiplier = radius * scaleX;
	    var yHexMultiplier = HEX_RATIO * radius * scaleY;
	
	    var hexX = xHexMultiplier * (1 + 1.5 * col);
	    var hexY = yHexMultiplier * (1 + col % 2 + 2 * row);
	    var paddingX = padding * (col + 1);
	    var paddingY = padding * (row + 1 + col % 2 * 0.5);
	    var centerX = boardX + hexX + paddingX;
	    var centerY = boardY + hexY + paddingY;
	    return new _vector.Vector(centerX, centerY);
	}
	
	function getBoardHexCenters(cols, rows, options) {
	    return (0, _iterators.colRowMapIterator)(cols, rows, function (col, row) {
	        return getHexCenter(col, row, options);
	    });
	}
	
	function isInsideHex(x, y, _ref3) {
	    var _ref3$centerX = _ref3.centerX;
	    var centerX = _ref3$centerX === undefined ? 0 : _ref3$centerX;
	    var _ref3$centerY = _ref3.centerY;
	    var centerY = _ref3$centerY === undefined ? 0 : _ref3$centerY;
	    var _ref3$scaleX = _ref3.scaleX;
	    var scaleX = _ref3$scaleX === undefined ? 1 : _ref3$scaleX;
	    var _ref3$scaleY = _ref3.scaleY;
	    var scaleY = _ref3$scaleY === undefined ? 1 : _ref3$scaleY;
	    var _ref3$radius = _ref3.radius;
	    var radius = _ref3$radius === undefined ? 10 : _ref3$radius;
	    var _ref3$optimized = _ref3.optimized;
	    var optimized = _ref3$optimized === undefined ? true : _ref3$optimized;
	}
	
	function getColRowFromPosition(x, y, _ref4) {
	    var _ref4$boardX = _ref4.boardX;
	    var boardX = _ref4$boardX === undefined ? 0 : _ref4$boardX;
	    var _ref4$boardY = _ref4.boardY;
	    var boardY = _ref4$boardY === undefined ? 0 : _ref4$boardY;
	    var _ref4$scaleX = _ref4.scaleX;
	    var scaleX = _ref4$scaleX === undefined ? 1 : _ref4$scaleX;
	    var _ref4$scaleY = _ref4.scaleY;
	    var scaleY = _ref4$scaleY === undefined ? 1 : _ref4$scaleY;
	    var _ref4$radius = _ref4.radius;
	    var radius = _ref4$radius === undefined ? 10 : _ref4$radius;
	    var _ref4$padding = _ref4.padding;
	    var padding = _ref4$padding === undefined ? 0 : _ref4$padding;
	    var _ref4$optimized = _ref4.optimized;
	    var optimized = _ref4$optimized === undefined ? true : _ref4$optimized;
	
	    var xHexMultiplier = radius * scaleX;
	    var colNumerator = x - boardX - padding - xHexMultiplier;
	    var colDenumerator = 1.5 * xHexMultiplier + padding;
	    var col = Math.round(colNumerator / colDenumerator);
	
	    var yHexMultiplier = HEX_RATIO * radius * scaleY;
	    var rowNumerator = y - boardY - yHexMultiplier * (1 + col % 2) - padding * (1 + col % 2 * 0.5);
	    var rowDenumerator = 2 * yHexMultiplier + padding;
	    var row = Math.round(rowNumerator / rowDenumerator);
	
	    var inscribedRadiusSqr = yHexMultiplier * yHexMultiplier;
	    var options = arguments[2];
	    var center = getHexCenter(col, row, options);
	
	    // check if inside inscribed circle first
	    if (optimized && center.distSqr(new _vector.Vector(x, y)) <= inscribedRadiusSqr) {
	        return new _col_row.ColRow(col, row);
	    } else {
	        return null;
	    }
	}

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
	        key: "distSqr",
	        value: function distSqr(vector) {
	            var xDiff = this.x - vector.x;
	            var yDiff = this.y - vector.y;
	            return xDiff * xDiff + yDiff * yDiff;
	        }
	    }, {
	        key: "dist",
	        value: function dist(vector) {
	            return Math.sqrt(this.distSqr(vector));
	        }
	    }, {
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
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ColRow = exports.ColRow = function ColRow(col, row) {
	    _classCallCheck(this, ColRow);
	
	    this.col = col;
	    this.row = row;
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.colRowIterator = colRowIterator;
	exports.colRowMapIterator = colRowMapIterator;
	exports.matrixColRowIterator = matrixColRowIterator;
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
	
	function matrixColRowIterator(matrix, handler) {
	    for (var col = 0; col < matrix.length; col++) {
	        for (var row = 0; row < matrix[col].length; row++) {
	            handler(matrix[col][row], col, row);
	        }
	    }
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
	
	var _iterators = __webpack_require__(4);
	
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

	"use strict";
	
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
	
	    if (options.strokeStyle) {
	        ctx.lineWidth = options.strokeWidth || 1;
	        ctx.strokeStyle = options.strokeStyle;
	        ctx.stroke();
	    }
	}

/***/ }
/******/ ]);
//# sourceMappingURL=shexy.js.map