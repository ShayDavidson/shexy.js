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
	    // Designers
	    BoardDesigner: __webpack_require__(1),
	    // Models
	    BoardModel: __webpack_require__(3),
	    HexModel: __webpack_require__(4),
	    // Utils
	    Direction: __webpack_require__(5),
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
	
	var NORMALIZED_HEX_COORDINATES = [new _utilsVector2['default'](-0.5, -0.866), new _utilsVector2['default'](0.5, -0.866), new _utilsVector2['default'](1, 0), new _utilsVector2['default'](0.5, 0.866), new _utilsVector2['default'](-0.5, 0.866), new _utilsVector2['default'](-1, 0)];
	
	exports['default'] = {
	
	    getHexVertices: function getHexVertices() {
	        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	        options = Object.assign({
	            centerX: 0,
	            centerY: 0,
	            scaleX: 1,
	            scaleY: 1,
	            radius: 1
	        }, options);
	
	        var center = new _utilsVector2['default'](options.centerX, options.centerY);
	        return NORMALIZED_HEX_COORDINATES.map(function (vector) {
	            vector.add(center).multiply(options.radius).multiplyX(options.scaleX).multiplyY(options.scaleY);
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
	        key: "add",
	        value: function add(vector) {
	            return new Vector(this.x + vector.x, this.y + vector.y);
	        }
	    }, {
	        key: "multiply",
	        value: function multiply(val) {
	            return new Vector(this.x * val, this.y * val);
	        }
	    }, {
	        key: "multiplyX",
	        value: function multiplyX(val) {
	            return new Vector(this.x * val, this.y);
	        }
	    }, {
	        key: "multiplyY",
	        value: function multiplyY(val) {
	            return new Vector(this.x, this.y * val);
	        }
	    }]);
	
	    return Vector;
	})();
	
	exports["default"] = Vector;
	module.exports = exports["default"];

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
	
	var _modelsHex_model = __webpack_require__(4);
	
	var _modelsHex_model2 = _interopRequireDefault(_modelsHex_model);
	
	var _utilsDirection = __webpack_require__(5);
	
	var _utilsDirection2 = _interopRequireDefault(_utilsDirection);
	
	/**
	* @Class Board
	*/
	
	var BoardModel = (function () {
	
	    /**
	    * @constructs Board
	    * @param {Object} options Options object
	    * @param {Integer} options.rows Number of rows in the board
	    * @param {Integer} options.cols Number of columns in the board
	    * @returns {Board} New Board object
	    */
	
	    function BoardModel() {
	        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	        _classCallCheck(this, BoardModel);
	
	        this.options = options;
	        this._constructHexMatrix();
	        this._connectHexMatrix();
	    }
	
	    _createClass(BoardModel, [{
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
	                _this._hexMatrix[row][col] = new _modelsHex_model2['default'](row, col);
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
	
	    return BoardModel;
	})();
	
	exports['default'] = BoardModel;
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
	
	var _utilsDirection = __webpack_require__(5);
	
	var _utilsDirection2 = _interopRequireDefault(_utilsDirection);
	
	var HexModel = (function () {
	    function HexModel(row, col) {
	        _classCallCheck(this, HexModel);
	
	        this.row = row;
	        this.col = col;
	        this._adjacents = {};
	    }
	
	    _createClass(HexModel, [{
	        key: 'connectAdajacent',
	        value: function connectAdajacent(hex, dir) {
	            if (hex && !this._adjacents[dir]) {
	                this._adjacents[dir] = hex;
	                hex.connectAdajacent(this, _utilsDirection2['default'].getOpposite(dir));
	            }
	        }
	    }]);
	
	    return HexModel;
	})();
	
	exports['default'] = HexModel;
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
/******/ ])
});
;
//# sourceMappingURL=shexy.js.map