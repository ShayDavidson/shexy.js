// factories

export function Axial(q, r) {
	return { q, r }
}

export function Cube(x, y, z) {
	return { x, y, z }
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

// utils

export function areCubesEqual(cubeA, cubeB) {
	return cubeA.x === cubeB.x && cubeA.y === cubeB.y && cubeA.z === cubeB.z
}

export function areAxialsEqual(axialA, axialB) {
	return axialA.r === axialB.r && axialA.q === axialB.q
}

export function addCubes(cubeA, cubeB) {
	return {
		x: cubeA.x + cubeB.x,
		y: cubeA.y + cubeB.y,
		z: cubeA.z + cubeB.z
	}
}

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

export function cubeAtDirection(direction) {
	return CUBE_DIRECTIONS[direction]
}

export function cubeNeighborAtDirection(cube, direction) {
	return addCubes(cube, cubeAtDirection(direction))
}

export const CUBE_DIRECTIONS = [
	Cube(+1, -1, 0), Cube(+1, 0, -1), Cube(0, +1, -1),
	Cube(-1, +1, 0), Cube(-1, 0, +1), Cube(0, -1, +1)
]

export function diagonalAtDirection(direction) {
	return CUBE_DIAGONALS[direction]
}

export function cubeDiagonalAtDirection(cube, direction) {
	return addCubes(cube, diagonalAtDirection(direction))
}

export const CUBE_DIAGONALS = [
	Cube(+2, -1, -1), Cube(+1, +1, -2), Cube(-1, +2, -1),
	Cube(-2, +1, +1), Cube(-1, -1, +2), Cube(+1, -2, +1)
]

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
