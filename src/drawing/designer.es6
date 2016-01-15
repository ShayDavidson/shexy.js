import Vector from 'utils/vector'
import { colRowIterator } from 'utils/iterators'

const DEFAULTS = {
    padding: 0,
    radius: 20,
    scale: 1
}
const NORMALIZED_HEX_COORDINATES = [
    new Vector(-0.5, -0.866),
    new Vector(0.5, -0.866),
    new Vector(1, 0),
    new Vector(0.5, 0.866),
    new Vector(-0.5, 0.866),
    new Vector(-1, 0)
]

export default {

    getHexVertices(options = {}) {
        options = Object.assign({
            radius: DEFAULTS.radius,
            scaleX: DEFAULTS.scale,
            scaleY: DEFAULTS.scale
        }, options)

        return NORMALIZED_HEX_COORDINATES.map((vector) => {
            return vector.multiplyXY(options.radius * options.scaleX, options.radius * options.scaleY)
        })
    },

    getBoardHexCenters(rows, cols, options = {}) {
        options = Object.assign({
            padding: DEFAULTS.padding,
            hex: {
                radius: DEFAULTS.radius,
                scaleX: DEFAULTS.scale,
                scaleY: DEFAULTS.scale
            }
        }, options)

        colRowIterator(rows, cols, (row, col) => {
            console.log(row, col)
        })
    }
}
