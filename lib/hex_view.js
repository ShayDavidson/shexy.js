import { hexRound, Hex } from './hex_coords'

export function Point(x, y) {
	return { x, y }
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
