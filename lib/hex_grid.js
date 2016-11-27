import { AXIAL_ZERO, axialsInRange, axialToCube, vertexId, vertexFromId, vertexNeighbors, equivalentVertices, areVerticesEquivalent } from './hex_coords'

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

// getters

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

// objects

export function minKey(obj) {
	let minKey
	let minValue = Infinity
	Object.keys(obj).forEach((key) => {
		const value = obj[key]
		if (value < minValue) {
			minKey = key
			minValue = value
		}
	})
	return minKey
}

export class VertexMac {
	constructor() {
		this._hash = {}
	}

	set(vertex, value) {

	}

	get(vertex) {
		// equivalentVertices(neighbor)
	}
}
// algorithms

export function shortestPathFrom(grid, fromVertex, toVertex) {
	const dists = { [vertexId(fromVertex)]: 0 } // TODO: use Map
	const prevs = {}
	const traspassed = {}
	while (true) { // TODO: don't assume all vertices are connected
		const minVertexId = minKey(dists)
		const minVertex = vertexFromId(minVertexId)
		if (areVerticesEquivalent(minVertex, toVertex)) {
			break
		}
		vertexNeighbors(minVertex).forEach((neighbor) => {
			const neighborId = vertexId(neighbor)
			if (traspassed[neighborId]) return
			const neighborDist = dists[neighborId] || Infinity
			const alt = dists[minVertexId] + lengthBetweenVertices(neighbor, minVertex)
			if (alt < neighborDist) {
				dists[neighborId] = alt
				prevs[neighborId] = minVertex
			}
		})
		traspassed[minVertexId] = true
		delete dists[minVertexId]
	}

	const path = [toVertex]
	let currentVertexId = vertexId(toVertex)
	while (prevs[currentVertexId]) {
		const vertex = prevs[currentVertexId]
		path.push(vertex)
		currentVertexId = vertexId(vertex)
	}
	return path.reverse()
}

export function lengthBetweenVertices(vertexA, vertexB) {
	return 1
}
