import Hex from 'hex'
import Direction from 'direction'

/**
* @Class Board
*/
export default class Board {

    /**
    * @constructs Board
    * @param {Object} options Options object
    * @param {Integer} options.rows Number of rows in the board
    * @param {Integer} options.cols Number of columns in the board
    * @returns {Board} New Board object
    */
    constructor(options = {}) {
        this.options = options
        this._constructHexMatrix()
        this._connectHexMatrix()
    }

    get(row, col) {
        if (this._hexMatrix[row]) {
            return this._hexMatrix[row][col]
        }
    }

    each(func) {
        for (let rowIndex = 0; rowIndex < this.options.rows; rowIndex++) {
            for (let colIndex = 0; colIndex < this.options.cols; colIndex++) {
                func.call(this, rowIndex, colIndex, this._hexMatrix[rowIndex][colIndex])
            }
        }
    }

    _constructHexMatrix() {
        this._hexMatrix = new Array(this.options.rows).fill(new Array(this.options.cols).fill(0))
        this.each((row, col) => {
            this._hexMatrix[row][col] = new Hex(row, col)
        })
    }

    _connectHexMatrix() {
        this.each((row, col, hex) => {
            let oddColDiff = (col % 2 === 0) ? 1 : 0
            hex.connectAdajacent(this.get(row + 1, col), Direction.BOT)
            hex.connectAdajacent(this.get(row + oddColDiff, col + 1), Direction.BOT_RIGHT)
            hex.connectAdajacent(this.get(row - 1 + oddColDiff, col + 1), Direction.TOP_RIGHT)
        })
    }
}
