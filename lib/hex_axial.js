import { hexMod, HEX_RANGE } from './hex_utils'

// factories

export function Axial(q, r) {
	return { q, r }
}

export const AXIAL_ZERO = Axial(0, 0)

// conversion

export function areAxialsEqual(axialA, axialB) {
	return axialA.r === axialB.r && axialA.q === axialB.q
}

export function addAxials(axialA, axialB) {
	return Axial(axialA.q + axialB.q, axialA.r + axialB.r)
}

export function distanceBetweenAxials(axialA, axialB) {
	return distanceBetweenCubes(axialToCube(axialA), axialToCube(axialB))
}

export function cubesInRange(center, range) {
	const results = []
	for (let dx = -range; dx <= range; dx++) {
		for (let dy = Math.max(-range, -dx - range); dy <= Math.min(range, -dx + range); dy++) {
			const dz = -(dx + dy)
			results.push(addCubes(center, Cube(dx, dy, dz)))
		}
	}
	return results
}

export function axialsInRange(center, range) {
	return cubesInRange(axialToCube(center), range).map(cubeToAxial)
}

export const AXIAL_DIRECTIONS = [
	Axial(+1, 0),  // 0 - | right
	Axial(0, +1),  // 1 - / bottom right
	Axial(-1, +1), // 2 - \ bottom left
	Axial(-1, 0),  // 3 - | left
	Axial(0, -1),  // 4 - / top left
	Axial(+1, -1)  // 5 - \ top right
]

// a direction is between (diagonal-1)..(diagonal)
export const AXIAL_DIAGONALS = [
	Axial(+1, +1), // 0 - ↘ bottom right
	Axial(-1, +2), // 1 - ↓ bottom
	Axial(-2, +1), // 2 - ↙ bottom left
	Axial(-1, -1), // 3 - ↖ top left
	Axial(+1, -2), // 4 - ↑ top
	Axial(+2, -1)  // 5 - ↗ top right
]

export function axialNeighborAtDirection(axial, direction) {
	return addAxials(axial, AXIAL_DIRECTIONS[hexMod(direction)])
}

export function sharedAxialsDirection(baseAxial, neighborAxial) {
	return HEX_RANGE.find((i) => areAxialsEqual(axialNeighborAtDirection(baseAxial, i), neighborAxial))
}

export function areAxialsNeighbors(axialA, axialB) {
	return !!sharedAxialsDirection(axialA, axialB)
}

export function axialNeighbors(axial) {
	return HEX_RANGE.map((i) => axialNeighborAtDirection(axial, i))
}

export function axialDiagonalAtDirection(axial, diagonalDirection) {
	return addAxials(axial, AXIAL_DIAGONALS[hexMod(diagonalDirection)])
}

export function axialsSharingDiagonal(axial, diagonalDirection) {
	return [axialNeighborAtDirection(axial, hexMod(diagonalDirection)), axialNeighborAtDirection(axial, hexMod(diagonalDirection + 1))]
}

// rounding

export function roundAxial(axial) {
	return cubeToAxial(roundCube(axialToCube(axial)))
}

// keys

export function axialId(axial) {
	return `${axial.q},${axial.r}`
}

export function axialFromId(id) {
	const [q, r] = id.split(',')
	return Axial(parseInt(q), parseInt(r))
}

// cubes

function Cube(x, y, z) {
	return { x, y, z }
}

function addCubes(cubeA, cubeB) {
	return Cube(cubeA.x + cubeB.x, cubeA.y + cubeB.y, cubeA.z + cubeB.z)
}

function cubeToAxial(cube) {
	return Axial(cube.x, cube.z)
}

function axialToCube(axial) {
	const x = axial.q
	const z = axial.r
	const y = -(x + z)
	return Cube(x, y, z)
}

export function distanceBetweenCubes(cubeA, cubeB) {
	return (Math.abs(cubeA.x - cubeB.x) + Math.abs(cubeA.y - cubeB.y) + Math.abs(cubeA.z - cubeB.z)) / 2
}

export function roundCube(cube) {
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
