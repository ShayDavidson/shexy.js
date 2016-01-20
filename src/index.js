import Designer from 'curves/designer'
import Board from 'models/board'
import Hex from 'models/hex'
import * as Direction from 'utils/direction'
import * as Iterators from 'utils/iterators'
import * as ObjectUtils from 'utils/object'
import Vector from 'utils/vector'

export let Shexy = {
    Curves: {
        Designer: Designer
    },
    Models: {
        Board: Board,
        Hex: Hex
    },
    Utils: {
        Direction: Direction,
        Vector: Vector,
        Iterators: Iterators,
        ObjectUtils: ObjectUtils
    }
}
