export default class Point {
    constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
    }

    add(point) {
        return new Point(this.x + point.x, this.y + point.y)
    }

    multiply(val) {
        return new Point(this.x * val, this.y * val)
    }

    multiplyX(val) {
        return new Point(this.x * val, this.y)
    }

    multiplyY(val) {
        return new Point(this.x, this.y  * val)
    }
}
