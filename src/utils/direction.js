import { objectIterator } from './direction'

export const HEX_ENUM = {
    top: 0,
    topRight: 1,
    botRight: 2,
    bot: 3,
    botLeft: 4,
    topLeft: 5
}

export const JUNCTION_ENUM = {
    topLeft: 0,
    topRight: 1,
    right: 2,
    bottomRight: 3,
    bottomLeft: 4,
    left: 5
}

export function getOpposite(dir) {
    return (dir + 3) % 6
}

export function hexDirectionIterator(handler) {
    objectIterator(HEX_ENUM, handler)
}
