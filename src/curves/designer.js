import { Vector } from 'utils/vector'
import { ColRow } from 'utils/col_row'
import { colRowMapIterator } from 'utils/iterators'

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

const DEFAULT_OPTIONS = {
    boardX: 0,
    boardY: 0,
    centerX: 0,
    centerY: 0,
    scaleX: 1,
    scaleY: 1,
    radius: 10,
    padding: 0,
    optimized: true
}

function fillOptions(options = {}) {
    return Object.assign({}, DEFAULT_OPTIONS, options)
}

export function getHexVertices(options = {}) {
    options = fillOptions(options)
    let xMultiplier = options.radius * options.scaleX
    let yMultiplier = options.radius * options.scaleY
    return NORMALIZED_HEX_COORDINATES.map((vector) => {
        return vector
            .multiplyXY(xMultiplier, yMultiplier)
            .addXY(options.centerX, options.centerY)
    })
}

export function getHexCenter(col, row, options = {}) {
    options = fillOptions(options)

    let xHexMultiplier = options.radius * options.scaleX
    let yHexMultiplier = HEX_RATIO * options.radius * options.scaleY

    let hexX = xHexMultiplier * (1 + (1.5 * col))
    let hexY = yHexMultiplier * (1 + (col % 2) + (2 * row))

    let paddingX = options.padding * (col + 1)
    let paddingY = options.padding * (row + 1 + ((col % 2) * 0.5))

    let centerX = options.boardX + hexX + paddingX
    let centerY = options.boardY + hexY + paddingY

    return new Vector(centerX, centerY)
}

export function getBoardHexCenters(cols, rows, options = {}) {
    options = fillOptions(options)

    return colRowMapIterator(cols, rows, (col, row) => {
        return getHexCenter(col, row, options)
    })
}

export function isInsideHex(x, y, options = {}) {
    options = fillOptions(options)
}

export function getColRowFromPosition(x, y, options = {}) {
    options = fillOptions(options)

    let xHexMultiplier = options.radius * options.scaleX
    let colNumerator = x - options.boardX - options.padding - xHexMultiplier
    let colDenumerator = 1.5 * xHexMultiplier + options.padding
    let col = Math.round(colNumerator / colDenumerator)

    let yHexMultiplier = HEX_RATIO * options.radius * options.scaleY
    let rowNumerator = y - options.boardY - yHexMultiplier * (1 + (col % 2)) - options.padding * (1 + ((col % 2) * 0.5))
    let rowDenumerator = 2 * yHexMultiplier + options.padding
    let row = Math.round(rowNumerator / rowDenumerator)

    let inscribedRadiusSqr = yHexMultiplier * yHexMultiplier
    let center = getHexCenter(col, row, options)

    // check if inside inscribed circle first
    if (options.optimized && center.distSqr(new Vector(x, y)) <= inscribedRadiusSqr) {
        return new ColRow(col, row)
    } else {
        return null
    }

}
