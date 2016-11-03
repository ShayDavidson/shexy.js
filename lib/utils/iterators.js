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
export function colRowEach(cols, rows, handler) {
	for (let col = 0; col < cols; col++) {
		for (let row = 0; row < rows; row++) {
			handler(col, row)
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
export function colRowMapToMatrix(cols, rows, mapFunction) {
	let matrix = new Array(cols)
	colRowEach(cols, rows, (col, row) => {
		matrix[col] || (matrix[col] = new Array(rows))
		matrix[col][row] = mapFunction(col, row)
	})
	return matrix
}

export function colRowMapToArray(cols, rows, mapFunction) {
	let map = new Array()
	colRowEach(cols, rows, (col, row) => {
		map.push(mapFunction(col, row))
	})
	return map
}

export function matrixEach(matrix, handler) {
	colRowEach(matrix.length, matrix[0].length, (col, row) => {
		handler(matrix[col][row], col, row)
	})
}

export function objectIterator(object, handler) {
	for (var key in object) {
		handler(key, object[key])
	}
}
