import { axialToCube, cubeToAxial, roundAxial, Axial, HEX_RANGE } from './hex_coords'
import { mod } from './math'

// everything here is with pointy-top hexgons in mind.

export function Point(x, y) {
	return { x, y }
}

export function addPoints(pointA, pointB) {
	return Point(pointA.x + pointB.x, pointA.y + pointB.y)
}

export function subtractPoints(pointA, pointB) {
	return Point(pointA.x - pointB.x, pointA.y - pointB.y)
}

export function hexCorner(center, size, i) {
	const angleDeg = 60 * i + 30
	const angleRad = Math.PI / 180 * angleDeg
	return Point(center.x + size * Math.cos(angleRad), center.y + size * Math.sin(angleRad))
}

export function hexCorners(center, size) {
	return HEX_RANGE.map((i) => hexCorner(center, size, i))
}

export function axialToPoint(axial, size, padding = 0) {
	const paddedSize = size + (padding / 2)
	const x = paddedSize * Math.sqrt(3) * (axial.q + axial.r / 2)
	const y = paddedSize * 3 / 2 * axial.r
	return Point(x, y)
}

export function cubeToPoint(cube, size, padding = 0) {
	return axialToPoint(cubeToAxial(cube), size, padding)
}

export function vertexToPoint(vertex, size, padding = 0) {
	const paddedSize = size + (padding / 2)
	const center = cubeToPoint(vertex.cube, size, padding)
	return hexCorner(center, paddedSize, vertex.i)
}

export function pointToAxial(point, size, padding = 0) {
	const paddedSize = size + (padding / 2)
	const q = (point.x * Math.sqrt(3) / 3 - point.y / 3) / paddedSize
	const r = point.y * 2 / 3 / paddedSize
	return roundAxial(Axial(q, r))
}

export function pointToCornerInAxial(point, axial, size, padding = 0) {
	const center = axialToPoint(axial, size, padding)
	const rad = Math.atan2(point.y - center.y, point.x - center.x)
	const deg = mod(rad * 180 / Math.PI, 360)
	return Math.floor(deg / 60)
}

export function pointToCube(point, size, padding = 0) {
	return axialToCube(pointToAxial(point, size, padding))
}
