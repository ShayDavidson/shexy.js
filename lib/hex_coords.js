// factories

export function Axial(q, r) {
	return { q, r }
}

export function Cube(x, y, z) {
	return { x, y, z }
}

// neighobrs and directions

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

export function cubesInRange(center, range) {
	const results = []
	for (let dx = -range; dx <= range; dx++) {
		for (let dy = Math.max(-range, -dx - range); dy <= Math.min(range, -dx + range); dy++) {
			const dz = -(dx + dy)
			results.push(cubeAdd(center, Cube(dx, dy, dz)))
		}
	}
	return results
}

export function cubeToAxial(cube) {
	return Axial(cube.x, cube.z)
}

export function axialToCube(axial) {
	const x = axial.q
	const z = axial.r
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

// rounding

export function axialRound(axial) {
	return cubeToAxial(cubeRound(axialToCube(axial)))
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
