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

export function getHexVertices({
    centerX = 0,
    centerY = 0,
    scaleX = 1,
    scaleY = 1,
    radius = 10
}) {
    let xMultiplier = radius * scaleX
    let yMultiplier = radius * scaleY

    return NORMALIZED_HEX_COORDINATES.map((vector) => {
        return vector
            .multiplyXY(xMultiplier, yMultiplier)
            .addXY(centerX, centerY)
    })
}

export function getHexCenter(col, row, {
    boardX = 0,
    boardY = 0,
    scaleX = 1,
    scaleY = 1,
    radius = 10,
    padding = 0
}) {
    let xHexMultiplier = radius * scaleX
    let yHexMultiplier = HEX_RATIO * radius * scaleY

    let hexX = xHexMultiplier * (1 + (1.5 * col))
    let hexY = yHexMultiplier * (1 + (col % 2) + (2 * row))
    let paddingX = padding * (col + 1)
    let paddingY = padding * (row + 1 + ((col % 2) * 0.5))
    let centerX = boardX + hexX + paddingX
    let centerY = boardY + hexY + paddingY
    return new Vector(centerX, centerY)
}

export function getBoardHexCenters(cols, rows, options) {
    return colRowMapIterator(cols, rows, (col, row) => {
        return getHexCenter(col, row, options)
    })
}

export function isInsideHex(x, y, {
    centerX = 0,
    centerY = 0,
    scaleX = 1,
    scaleY = 1,
    radius = 10,
    optimized = true
}) {

}

export function getColRowFromPosition(x, y, {
    boardX = 0,
    boardY = 0,
    scaleX = 1,
    scaleY = 1,
    radius = 10,
    padding = 0,
    optimized = true
}) {
    let xHexMultiplier = radius * scaleX
    let colNumerator = x - boardX - padding - xHexMultiplier
    let colDenumerator = 1.5 * xHexMultiplier + padding
    let col = Math.round(colNumerator / colDenumerator)

    let yHexMultiplier = HEX_RATIO * radius * scaleY
    let rowNumerator = y - boardY - yHexMultiplier * (1 + (col % 2)) - padding * (1 + ((col % 2) * 0.5))
    let rowDenumerator = 2 * yHexMultiplier + padding
    let row = Math.round(rowNumerator / rowDenumerator)

    let inscribedRadiusSqr = yHexMultiplier * yHexMultiplier
    let options = arguments[2]
    let center = getHexCenter(col, row, options)

    // check if inside inscribed circle first
    if (optimized && center.distSqr(new Vector(x, y)) <= inscribedRadiusSqr) {
        return new ColRow(col, row)
    } else {
        return null
    }

}
