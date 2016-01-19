import { Direction } from 'utils/direction'

export class Hex {

    constructor(row, col) {
        this.row = row
        this.col = col
        this._adjacents = {}
    }

    connectAdajacent(hex, dir) {
        if (hex && !this._adjacents[dir]) {
            this._adjacents[dir] = hex
            hex.connectAdajacent(this, Direction.getOpposite(dir))
        }
    }
}
