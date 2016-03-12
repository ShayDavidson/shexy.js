import { objectIterator } from 'utils/iterators'
import { reverse as reverseObject } from 'utils/obj'

export const EDGE_DIRECTIONS = {
    top: 0,
    topRight: 1,
    botRight: 2,
    bot: 3,
    botLeft: 4,
    topLeft: 5
}

export const VERTEX_DIRECTIONS = {
    topLeft: 0,
    topRight: 1,
    right: 2,
    bottomRight: 3,
    bottomLeft: 4,
    left: 5
}

const _reversedEdgeDirections = reverseObject(EDGE_DIRECTIONS)
const _reversedVertexDirections = reverseObject(VERTEX_DIRECTIONS)

export function getOpposite(dir) {
    return (dir + 3) % 6
}

export function getEdgeDirectionName(direction) {
    return _reversedEdgeDirections(direction)
}

export function getVertexDirectionName(direction) {
    return _reversedVertexDirections(direction)
}

export function getEdgeDirectionByName(directionName) {
    return EDGE_DIRECTIONS[directionName]
}

export function getVertexDirectionByName(directionName) {
    return VERTEX_DIRECTIONS[directionName]
}

export function edgeDirectionIterator(handler) {
    objectIterator(EDGE_DIRECTIONS, handler)
}

export function vertexDirectionIterator(handler) {
    objectIterator(VERTEX_DIRECTIONS, handler)
}
