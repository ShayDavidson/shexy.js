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
export function colRowIterator(cols, rows, handler) {
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
export function colRowMapIterator(cols, rows, mapFunction) {
    let matrix = new Array(cols)
    colRowIterator(cols, rows, (col, row) => {
        matrix[col] || (matrix[col] = new Array(rows))
        matrix[col][row] = mapFunction(col, row)
    })
    return matrix
}

export function matrixColRowIterator(matrix, handler) {
    for (let col = 0; col < matrix.length; col++) {
        for (let row = 0; row < matrix[col].length; row++) {
            handler(matrix[col][row], col, row)
        }
    }
}

export function matrixColRowMapIterator(matrix, mapFunction) {
    let mappedMatrix = new Array(matrix.length)
    for (let col = 0; col < matrix.length; col++) {
        for (let row = 0; row < matrix[col].length; row++) {
            mappedMatrix[col] || (mappedMatrix[col] = new Array(matrix[col].length))
            mappedMatrix[col][row] = mapFunction(matrix[col][row], col, row)
        }
    }
    return mappedMatrix
}


export function objectIterator(object, handler) {
    for (var key in object) {
        handler(key, object[key])
    }
}
