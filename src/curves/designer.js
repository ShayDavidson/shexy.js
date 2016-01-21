import { Vector } from 'utils/vector'
import { colRowMapIterator } from 'utils/iterators'
import { deepMerge } from 'utils/object'

const DEFAULT_HEX_OPTIONS = {
    centerX: 0,
    centerY: 0,
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

export class Designer {

    static getHexVertices(options = {}) {
        options = Object.assign(DEFAULT_HEX_OPTIONS, options)

        let xMultiplier = options.radius * options.scaleX
        let yMultiplier = options.radius * options.scaleY
        return NORMALIZED_HEX_COORDINATES.map((vector) => {
            return vector
                .multiplyXY(xMultiplier, yMultiplier)
                .addXY(options.centerX, options.centerY)
        })
    }

    static getBoardHexCenters(cols, rows, options = {}) {
        options = deepMerge({
            baseX: 0,
            baseY: 0,
            hex: DEFAULT_HEX_OPTIONS,
            padding: 0
        }, options)

        let xHexMultiplier = options.hex.radius * options.hex.scaleX
        let yHexMultiplier = options.hex.radius * HEX_RATIO * options.hex.scaleY

        return colRowMapIterator(cols, rows, (col, row) => {
            let hexX = xHexMultiplier * (1 + (1.5 * col))
            let hexY = yHexMultiplier * (1 + (col % 2) + (2 * row))
            let paddingX = options.padding * (col + 1)
            let paddingY = options.padding * (row + 1 + ((col % 2) * 0.5))
            let centerX = options.baseX + hexX + paddingX
            let centerY = options.baseY + hexY + paddingY
            return new Vector(centerX, centerY)
        })
    }
}
