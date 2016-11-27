import { AXIAL_ZERO, axialsInRange, axialToCube } from './hex_coords'

// factories

export function Grid(range) {
	const axials = axialsInRange(AXIAL_ZERO, range)
	const grid = {}
	axials.forEach((axial) => {
		grid[axial.q] = grid[axial.q] || {}
		grid[axial.q][axial.r] = Hex(axial)
	})
	return grid
}

export function Hex(axial) {
	return {
		coords: {
			axial: axial,
			cube: axialToCube(axial)
		}
	}
}

// predicates

export function hexAt(grid, axial) {
	return grid[axial.q] && grid[axial.q][axial.r]
}

// iterators

export function gridForEachHex(grid, handler) {
	Object.keys(grid).forEach((q) => {
		Object.keys(grid[q]).forEach((r) => {
			handler(grid[q][r])
		})
	})
}
