export default class Vector {
    constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
    }

    add(vector) {
        return new Vector(this.x + vector.x, this.y + vector.y)
    }

    multiply(val) {
        return new Vector(this.x * val, this.y * val)
    }

    multiplyX(val) {
        return new Vector(this.x * val, this.y)
    }

    multiplyY(val) {
        return new Vector(this.x, this.y  * val)
    }
}
