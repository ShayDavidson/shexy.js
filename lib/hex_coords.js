// utils

export function mod(i, n) {
	return ((i % n) + n) % n
}

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

export function Vertex(cube, i) {
	return { cube, i: mod(i, 6) } // fixes js negative modulo
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
	return areCubesEqual(vertexA.cube, vertexB.cube) && vertexA.i === vertexB.i
}

export function areVerticesEquivalent(vertexA, vertexB) {
	return !!equivalentVertices(vertexA).find((equivalentVertex) => areVerticesEqual(equivalentVertex, vertexB))
}

export function equivalentVertices(vertex) {
	const shared = cubesSharingDiagonal(vertex.cube, vertex.i).map((cube, index) => Vertex(cube, vertex.i + (index + 1) * 2))
	return [ vertex, ...shared ]
}

// arithemtic

export function addCubes(cubeA, cubeB) {
	return Cube(cubeA.x + cubeB.x, cubeA.y + cubeB.y, cubeA.z + cubeB.z)
}

export function addVertices(vertexA, vertexB) {
	return Vertex(addCubes(vertexA.cube, vertexB.cube), vertexA.i + vertexB.i)
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
	Cube(0, +1, -1), // 0 - top left
	Cube(+1, 0, -1), // 1 - top right
	Cube(+1, -1, 0), // 2 - right
	Cube(0, -1, +1), // 3 - bottom right
	Cube(-1, 0, +1), // 4 - bottom left
	Cube(-1, +1, 0)  // 5 - left
]

export function cubeNeighborAtDirection(cube, direction) {
	return addCubes(cube, CUBE_DIRECTIONS[hexMod(direction)])
}

export function cubeNeigbors(cube) {
	return HEX_RANGE.map((i) => cubeNeighborAtDirection(cube, i))
}

export const CUBE_DIAGONALS = [
	Cube(+1, +1, -2), // 0 - top
	Cube(-1, +2, -1), // 1 - top right
	Cube(-2, +1, +1), // 2 - bottom right
	Cube(-1, -1, +2), // 3 - bottom
	Cube(+1, -2, +1), // 4 - bottom left
	Cube(+2, -1, -1)  // 5 - top left
]

export function cubeDiagonalAtDirection(cube, diagonalDirection) {
	return addCubes(cube, CUBE_DIAGONALS[hexMod(diagonalDirection)])
}

export function cubeDiagonals(cube) {
	return HEX_RANGE.map((i) => cubeDiagonalAtDirection(cube, i))
}

export function cubesSharingDiagonal(cube, diagonalDirection) {
	return [cubeNeighborAtDirection(cube, diagonalDirection), cubeNeighborAtDirection(cube, diagonalDirection + 1)]
}

export function vertexNeighbors(vertex) {
	return [
		Vertex(vertex.cube, vertex.i - 1),
		Vertex(cubeDiagonalAtDirection(vertex.cube, vertex.i), vertex.i + 3),
		Vertex(vertex.cube, vertex.i + 1)
	]
}

export function cubeVertices(cube) {
	return HEX_RANGE.map((i) => Vertex(cube, i))
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
	return `${cubeId(vertex.cube)}:${vertex.i}`
}

export function vertexFromId(id) {
	const [cube, i] = id.split(':')
	const [x, y, z] = cube.split(',')
	return Vertex(Cube(parseInt(x), parseInt(y), parseInt(z)), parseInt(i))
}
