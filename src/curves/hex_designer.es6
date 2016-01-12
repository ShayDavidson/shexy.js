import Point from 'point'

const NORMALIZED_HEX_COORDINATES = [
    new Point(-0.5, -0.866),
    new Point(0.5, -0.866),
    new Point(1, 0),
    new Point(0.5, 0.866),
    new Point(-0.5, 0.866),
    new Point(-1, 0)
]

export class HexDesigner {

    static getPoints(options = {}) {
        options = Object.assign({
            centerX: 0,
            centerY: 0,
            scaleX: 1,
            scaleY: 1,
            radius: 1
        }, options)

        let center = new Point(options.centerX, options.centerY)
        return NORMALIZED_HEX_COORDINATES.map((point) => {
            point.add(center)
                .multiply(options.radius)
                .multiplyX(options.scaleX)
                .multiplyY(options.scaleY)
        })
    }
}
