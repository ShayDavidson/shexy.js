import { AXIAL_ZERO, axialsInRange, vertexFromId, vertexNeighbors, areVerticesEquivalent, vertexUid } from './hex_coords'

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
	return { axial }
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

export class VertexMap {
	constructor() {
		this.hash = {}
	}

	set(vertex, value) {
		this.hash[vertexUid(vertex)] = value
	}

	get(vertex) {
		return this.hash[vertexUid(vertex)]
	}

	delete(vertex) {
		delete this.hash[vertexUid(vertex)]
	}
}

// trasspassing

export function addBlocksBetweenAxials(blocks, axialA, axialB) {
}

export function addBlocksBetweenVertices(blocks, vertexA, vertexB) {
	const vertexAUid = vertexUid(vertexA)
	const vertexBUid = vertexUid(vertexB)
	blocks.set(vertexA, vertexBUid)
	blocks.set(vertexB, vertexAUid)
}

export function pathIsBlocked(blocks, vertexA, vertexB) {
	const vertexAUid = vertexUid(vertexA)
	const vertexBUid = vertexUid(vertexB)
	blocks.get(vertexA) === vertexBUid || blocks.get(vertexB) === vertexAUid
}

// algorithms

export function shortestPathFrom(grid, blocks, fromVertex, toVertex) {
	const dists = new VertexMap()
	dists.set(fromVertex, 0)
	const prevs = new VertexMap()
	const traspassed = new VertexMap()
	while (true) { // TODO: don't assume all vertices are connected, limit by range?
		const minVertexId = minKey(dists.hash)
		const minVertex = vertexFromId(minVertexId)
		if (areVerticesEquivalent(minVertex, toVertex)) {
			break
		}
		vertexNeighbors(minVertex).forEach((neighbor) => {
			if (traspassed.get(neighbor) || pathIsBlocked(blocks, neighbor, minVertex)) return
			const neighborDist = dists.get(neighbor) || Infinity
			const alt = dists.get(minVertex) + lengthBetweenVertices(neighbor, minVertex)
			if (alt < neighborDist) {
				dists.set(neighbor, alt)
				prevs.set(neighbor, minVertex)
			}
		})
		traspassed.set(minVertex, true)
		dists.delete(minVertex)
	}

	const path = [toVertex]
	let currentVertex = toVertex
	while (prevs.get(currentVertex)) {
		const vertex = prevs.get(currentVertex)
		path.push(vertex)
		currentVertex = vertex
	}
	return path.reverse()
}

export function lengthBetweenVertices(vertexA, vertexB) {
	return 1
}
