import { Hex } from 'hex'
import { Direction } from 'utils/direction'
import { colRowIterator, colRowMapIterator } from 'utils/iterators'

/**
* @Class Board
*/
export class Board {

    /**
    * @constructs Board
    * @param {Object} options Options object
    * @param {Integer} options.rows Number of rows in the board
    * @param {Integer} options.cols Number of columns in the board
    * @returns {Board} New Board object
    */
    constructor(options = {}) {
        this.options = options
        this.cols = options.cols
        this.rows = options.rows
        this._constructHexMatrix()
        this._constructHexEdges()
    }

    get(col, row) {
        if (this._hexMatrix[col]) {
            return this._hexMatrix[col][row]
        }
    }

    each(func) {
        colRowIterator(this.cols, this.rows, (col, row) => {
            func.call(this, col, row, this.get(col, row))
        })
    }

    _constructHexMatrix() {
        this._hexMatrix = colRowMapIterator(this.cols, this.rows, (col, row) => {
            return new Hex(col, row)
        })
    }

    _constructHexEdges() {
        this.each((row, col, hex) => {
            let oddColDiff = (col % 2 === 0) ? 1 : 0
            hex.connectAdajacent(this.get(row + 1, col), Direction.BOT)
            hex.connectAdajacent(this.get(row + oddColDiff, col + 1), Direction.BOT_RIGHT)
            hex.connectAdajacent(this.get(row - 1 + oddColDiff, col + 1), Direction.TOP_RIGHT)
        })
    }
}
