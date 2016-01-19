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
//# sourceMappingURL=iterators.js.map