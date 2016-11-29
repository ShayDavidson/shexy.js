import { mod } from './math'

// utils

export function hexMod(i) {
	return mod(i, 6)
}

export const HEX_RANGE = [0, 1, 2, 3, 4, 5]

// factories

export function Axial(q, r) {
	return { q, r }
}

export function Cube(x, y, z) {
	return { x, y, z }
}

export function Vertex(axial, i) {
	return { axial, i: mod(i, 6) } // fixes js negative modulo
}

export const AXIAL_ZERO = Axial(0, 0)
export const CUBE_ZERO = Cube(0, 0, 0)

// conversion

export function cubeToAxial(cube) {
	return Axial(cube.x, cube.z)
}

export function axialToCube(axial) {
	const x = axial.q
	const z = axial.r
	const y = -(x + z)
	return Cube(x, y, z)
}

// equality

export function areCubesEqual(cubeA, cubeB) {
	return cubeA.x === cubeB.x && cubeA.y === cubeB.y && cubeA.z === cubeB.z
}

export function areAxialsEqual(axialA, axialB) {
	return axialA.r === axialB.r && axialA.q === axialB.q
}

export function areVerticesEqual(vertexA, vertexB) {
	return areAxialsEqual(vertexA.axial, vertexB.axial) && vertexA.i === vertexB.i
}

export function areVerticesEquivalent(vertexA, vertexB) {
	return !!equivalentVertices(vertexA).find((equivalentVertex) => areVerticesEqual(equivalentVertex, vertexB))
}

export function equivalentVertices(vertex) {
	const shared = axialsSharingDiagonal(vertex.axial, vertex.i).map((axial, index) => Vertex(axial, vertex.i + (index + 1) * 2))
	return [ vertex, ...shared ]
}

// arithemtic

export function addCubes(cubeA, cubeB) {
	return Cube(cubeA.x + cubeB.x, cubeA.y + cubeB.y, cubeA.z + cubeB.z)
}

export function addAxials(axialA, axialB) {
	return Axial(axialA.q + axialB.q, axialA.r + axialB.r)
}

export function addVertices(vertexA, vertexB) {
	return Vertex(addAxials(vertexA.axial, vertexB.axial), vertexA.i + vertexB.i)
}

// distances

export function distanceBetweenCubes(cubeA, cubeB) {
	return (Math.abs(cubeA.x - cubeB.x) + Math.abs(cubeA.y - cubeB.y) + Math.abs(cubeA.z - cubeB.z)) / 2
}

// ranges

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

// neighobrs and directions

export const CUBE_DIRECTIONS = [
	Cube(1, -1, 0),  // 0 - left
	Cube(0, -1, +1), // 1 - bottom left
	Cube(-1, 0, +1), // 2 - bottom right
	Cube(-1, +1, 0), // 3 - right
	Cube(0, +1, -1), // 4 - top right
	Cube(+1, 0, -1)  // 5 - top left
]

export const AXIAL_DIRECTIONS = CUBE_DIRECTIONS.map(cubeToAxial)

export function cubeNeighborAtDirection(cube, direction) {
	return addCubes(cube, CUBE_DIRECTIONS[hexMod(direction)])
}

export function axialNeighborAtDirection(axial, direciton) {
	return addAxials(axial, AXIAL_DIRECTIONS[hexMod(direciton)])
}

export function cubeNeigbors(cube) {
	return HEX_RANGE.map((i) => cubeNeighborAtDirection(cube, i))
}

export const CUBE_DIAGONALS = [
	Cube(+1, -2, +1), // 0	 - bottom right
	Cube(-1, -1, +2), // 1 - bottom
	Cube(-2, +1, +1), // 2 - bottom left
	Cube(-1, +2, -1), // 3 - top left
	Cube(+1, +1, -2), // 4 - top
	Cube(+2, -1, -1)  // 5 - top right
]

export const AXIAL_DIAGONALS = CUBE_DIAGONALS.map(cubeToAxial)

export function cubeDiagonalAtDirection(cube, diagonalDirection) {
	return addCubes(cube, CUBE_DIAGONALS[hexMod(diagonalDirection)])
}

export function axialDiagonalAtDirection(axial, diagonalDirection) {
	return addAxials(axial, AXIAL_DIAGONALS[hexMod(diagonalDirection)])
}

export function cubeDiagonals(cube) {
	return HEX_RANGE.map((i) => cubeDiagonalAtDirection(cube, i))
}

export function cubesSharingDiagonal(cube, diagonalDirection) {
	return [cubeNeighborAtDirection(cube, hexMod(diagonalDirection)), cubeNeighborAtDirection(cube, hexMod(diagonalDirection + 1))]
}

export function axialsSharingDiagonal(axial, diagonalDirection) {
	return [axialNeighborAtDirection(axial, hexMod(diagonalDirection)), axialNeighborAtDirection(axial, hexMod(diagonalDirection + 1))]
}

export function vertexNeighbors(vertex) {
	return [
		Vertex(vertex.axial, vertex.i - 1),
		Vertex(axialDiagonalAtDirection(vertex.axial, vertex.i), vertex.i + 3),
		Vertex(vertex.axial, vertex.i + 1)
	]
}

export function axialVertices(axial) {
	return HEX_RANGE.map((i) => Vertex(axial, i))
}

// rounding

export function roundAxial(axial) {
	return cubeToAxial(roundCube(axialToCube(axial)))
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

// keys

export function axialId(axial) {
	return `${axial.q},${axial.r}`
}

export function axialFromId(id) {
	const [q, r] = id.split(',')
	return Axial(parseInt(q), parseInt(r))
}

export function cubeId(cube) {
	return `${cube.x},${cube.y},${cube.z}`
}

export function vertexId(vertex) {
	return `${axialId(vertex.axial)}:${vertex.i}`
}

export function vertexFromId(id) {
	const [axial, i] = id.split(':')
	const [q, r] = axial.split(',')
	return Vertex(Axial(parseInt(q), parseInt(r)), parseInt(i))
}
