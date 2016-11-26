import { axialToCube, roundAxial, Axial } from './hex_coords'

// everything here is with pointy-top hexgons in mind.

export function Point(x, y) {
	return { x, y }
}

export function hexCorner(center, size, i) {
	const angleDeg = 60 * i + 30
	const angleRad = Math.PI / 180 * angleDeg
	return Point(center.x + size * Math.cos(angleRad), center.y + size * Math.sin(angleRad))
}

export function axialToPoint(axial, size, padding = 0) {
	const x = size * Math.sqrt(3) * (axial.q + axial.r / 2)
	const y = size * 3 / 2 * axial.r
	return Point(x, y)
}

export function pointToAxial(point, size, padding = 0) {
	const q = (point.x * Math.sqrt(3) / 3 - point.y / 3) / size
	const r = point.y * 2 / 3 / size
	return roundAxial(Axial(q, r))
}

export function pointToCube(point, size, padding = 0) {
	return axialToCube(pointToAxial(point, size, padding))
}
