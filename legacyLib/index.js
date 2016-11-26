// import * as Designer from 'curves/designer'
// import * as Board from 'logic/board'
// import * as Hex from 'logic/hex'
// import * as Direction from 'logic/direction'
// import * as ColRow from 'utils/col_row'
// import * as CanvasUtils from 'utils/canvas'
// import * as Iterators from 'utils/iterators'
// import * as ObjectUtils from 'utils/obj'
// import * as Vector from 'utils/vector'
//
// export default {
// 	Designer: Designer,
// 	Board: Board,
// 	Hex: Hex,
// 	Direction: Direction,
// 	CanvasUtils: CanvasUtils,
// 	ColRow: ColRow,
// 	Iterators: Iterators,
// 	ObjecUtils: ObjectUtils,
// 	Vector: Vector
// }

export function Point(x, y) {
	return { x, y }
}

export function Hex(q, r) {
	return { q, r }
}

export function hexCorner(center, size, i) {
	const angleDeg = 60 * i + 30
	const angleRad = Math.PI / 180 * angleDeg
	return Point(center.x + size * Math.cos(angleRad), center.y + size * Math.sin(angleRad))
}

export function hexToPoint(hex, size, padding = 0) {
	const x = size * Math.sqrt(3) * (hex.q + hex.r / 2)
	const y = size * 3 / 2 * hex.r
	return Point(x, y)
}

export function pointToHex(point, size, padding = 0) {
	const q = (point.x * Math.sqrt(3) / 3 - point.y / 3) / size
	const r = point.y * 2 / 3 / size
	return hexRound(Hex(q, r))
}

export function hexRound(hex) {
	return cubeToHex(cubeRound(hexToCube(hex)))
}

export function cubeRound(cube) {
	let rx = Math.round(cube.x)
	let ry = Math.round(cube.y)
	let rz = Math.round(cube.z)

	const xDiff = Math.abs(rx - cube.x)
	const yDiff = Math.abs(ry - cube.y)
	const zDiff = Math.abs(rz - cube.z)

	if (xDiff > yDiff && xDiff > zDiff) {
		rx = -ry - rz
	} else if (yDiff > zDiff) {
		ry = -rx - rz
	} else {
		rz = -rx - ry
	}

	return Cube(rx, ry, rz)
}

export function Cube(x, y, z) {
	return { x, y, z }
}

export function cubeToHex(cube) {
	return Hex(cube.x, cube.z)
}

export function hexToCube(hex) {
	const x = hex.q
	const z = hex.r
	const y = -(x + z)
	return Cube(x, y, z)
}

export function cubeAdd(cubeA, cubeB) {
	return {
		x: cubeA.x + cubeB.x,
		y: cubeA.y + cubeB.y,
		z: cubeA.z + cubeB.z
	}
}

export function cubeDistance(cubeA, cubeB) {
	return (Math.abs(cubeA.x - cubeB.x) + Math.abs(cubeA.y - cubeB.y) + Math.abs(cubeA.z - cubeB.z)) / 2
}

export function cubeAtDirection(direction) {
	return CUBE_DIRECTIONS[direction]
}

export function cubeNeighborAtDirection(cube, direction) {
	return cubeAdd(cube, cubeAtDirection(direction))
}

export const CUBE_DIRECTIONS = [
	Cube(+1, -1, 0), // right
	Cube(+1, 0, -1), // top right
	Cube(0, +1, -1), // top left
	Cube(-1, +1, 0), // left
	Cube(-1, 0, +1), // bottom left
	Cube(0, -1, +1)  // bottom right
]

export function diagonalAtDirection(direction) {
	return CUBE_DIAGONALS[direction]
}

export function cubeDiagonalAtDirection(cube, direction) {
	return cubeAdd(cube, diagonalAtDirection(direction))
}

export const CUBE_DIAGONALS = [
	Cube(+2, -1, -1), // top left
	Cube(+1, +1, -2), // top
	Cube(-1, +2, -1), // top right
	Cube(-2, +1, +1), // bottom right
	Cube(-1, -1, +2), // bottom
	Cube(+1, -2, +1)  // bottom left
]
