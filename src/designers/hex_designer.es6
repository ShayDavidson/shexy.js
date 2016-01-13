import Vector from 'utils/vector'

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
            centerX: 0,
            centerY: 0,
            scaleX: 1,
            scaleY: 1,
            radius: 1
        }, options)

        let center = new Vector(options.centerX, options.centerY)
        return NORMALIZED_HEX_COORDINATES.map((vector) => {
            vector.add(center)
                .multiply(options.radius)
                .multiplyX(options.scaleX)
                .multiplyY(options.scaleY)
        })
    }
}
