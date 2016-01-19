export class Vector {
    constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
    }

    multiplyXY(xMultiplier, yMultiplier) {
        return new Vector(this.x * xMultiplier, this.y * yMultiplier)
    }
}
