export class Vector {
    constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
    }

    distSqr(vector) {
        let xDiff = this.x - vector.x
        let yDiff = this.y - vector.y
        return xDiff * xDiff + yDiff * yDiff
    }

    dist(vector) {
        return Math.sqrt(this.distSqr(vector))
    }

    addXY(xAddition, yAddition) {
        return new Vector(this.x + xAddition, this.y + yAddition)
    }

    multiplyXY(xMultiplier, yMultiplier) {
        return new Vector(this.x * xMultiplier, this.y * yMultiplier)
    }
}
