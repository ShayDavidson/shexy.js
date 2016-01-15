import Vector from 'utils/vector'
import { colRowMapIterator } from 'utils/iterators'

const DEFAULT_HEX_OPTIONS = {
    radius: 20,
    scaleX: 1,
    scaleY: 1
}

/**
* The ratio between half the height of the hex to its radius,
* which actually equals sqrt(3)/2.
**/
const HEX_RATIO = 0.866

const NORMALIZED_HEX_COORDINATES = [
    new Vector(-0.5, -HEX_RATIO),
    new Vector(0.5, -HEX_RATIO),
    new Vector(1, 0),
    new Vector(0.5, HEX_RATIO),
    new Vector(-0.5, HEX_RATIO),
    new Vector(-1, 0)
]

export default {

    getHexVertices(options = {}) {
        options = Object.assign(DEFAULT_HEX_OPTIONS, options)

        return NORMALIZED_HEX_COORDINATES.map((vector) => {
            return vector.multiplyXY(options.radius * options.scaleX, options.radius * options.scaleY)
        })
    },

    getBoardHexCenters(cols, rows, options = {}) {
        options = Object.assign({
            baseX: 0,
            baseY: 0,
            padding: 0,
            hex: DEFAULT_HEX_OPTIONS
        }, options)

        return colRowMapIterator(cols, rows, (col, row) => {
            let centerX = options.radius * (1 + (1.5 * col))
            let centerY = options.radius * HEX_RATIO * (1 + (col % 2) + (2 * row))
            return new Vector(options.baseX + centerX, options.baseY + centerY)
        })
    }
}
