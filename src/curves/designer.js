import { Vector } from 'utils/vector'
import { ColRow } from 'utils/col_row'
import { colRowMapIterator } from 'utils/iterators'
import { deepMerge } from 'utils/object'

const DEFAULT_HEX_OPTIONS = {
    centerX: 0,
    centerY: 0,
    radius: 20,
    scaleX: 1,
    scaleY: 1
}

const DEFAULT_BOARD_OPTIONS = {
    baseX: 0,
    baseY: 0,
    hex: DEFAULT_HEX_OPTIONS,
    padding: 0
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

export function getHexVertices(options = {}) {
    options = deepMerge(DEFAULT_HEX_OPTIONS, options)

    let xMultiplier = options.radius * options.scaleX
    let yMultiplier = options.radius * options.scaleY
    return NORMALIZED_HEX_COORDINATES.map((vector) => {
        return vector
            .multiplyXY(xMultiplier, yMultiplier)
            .addXY(options.centerX, options.centerY)
    })
}

export function getBoardHexCenters(cols, rows, options = {}) {
    options = deepMerge(DEFAULT_BOARD_OPTIONS, options)

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

export function getColRowFromPosition(x, y, options = {}) {
    options = deepMerge(DEFAULT_BOARD_OPTIONS, options)

    let xHexMultiplier = options.hex.radius * options.hex.scaleX
    let colNumerator = x - options.baseX - options.padding - xHexMultiplier
    let colDenumerator = 1.5 * xHexMultiplier + options.padding
    let col = Math.round(colNumerator / colDenumerator)

    let yHexMultiplier = options.hex.radius * HEX_RATIO * options.hex.scaleY
    let rowNumerator = y - options.baseX - yHexMultiplier * (1 + (col % 2)) - options.padding * (1 + ((col % 2) * 0.5))
    let rowDenumerator = 2 * yHexMultiplier + options.padding
    let row = Math.round(rowNumerator / rowDenumerator)

    return new ColRow(col, row)
}
