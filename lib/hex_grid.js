import { minKey } from './utils'
import { AXIAL_ZERO, axialsInRange } from './hex_axial'
import { VertexMap, vertexFromId, vertexNeighbors, areVerticesEquivalent, verticesSharingAxials, vertexUid } from './hex_vertex'

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

// trasspassing

export function addBlocksBetweenAxials(blocks, axialA, axialB) {
	const [vertexA, vertexB] = verticesSharingAxials(axialA, axialB)
	if (vertexA && vertexB) {
		addBlocksBetweenVertices(blocks, vertexA, vertexB)
	}
}

export function removeBlocksBetweenAxials(blocks, axialA, axialB) {
	const [vertexA, vertexB] = verticesSharingAxials(axialA, axialB)
	if (vertexA && vertexB) {
		removeBlocksBetweenVertices(blocks, vertexA, vertexB)
	}
}

export function addBlocksBetweenVertices(blocks, vertexA, vertexB) {
	const pathUid = [vertexUid(vertexA), vertexUid(vertexB)].sort().join('|')
	blocks[pathUid] = true
}

export function removeBlocksBetweenVertices(blocks, vertexA, vertexB) {
	const pathUid = [vertexUid(vertexA), vertexUid(vertexB)].sort().join('|')
	delete blocks[pathUid]
}

export function pathIsBlockedBetweenVertices(blocks, vertexA, vertexB) {
	const pathUid = [vertexUid(vertexA), vertexUid(vertexB)].sort().join('|')
	return !!blocks[pathUid]
}

export function pathIsBlockedBetweenAxials(blocks, axialA, axialB) {
	const [vertexA, vertexB] = verticesSharingAxials(axialA, axialB)
	if (vertexA && vertexB) {
		return pathIsBlockedBetweenVertices(blocks, vertexA, vertexB)
	} else {
		return false
	}
}

// algorithms

export function shortestPathFrom(grid, blocks, fromVertex, toVertex, limitToDistance) {
	const dists = new VertexMap()
	dists.set(fromVertex, 0)
	const prevs = new VertexMap()
	const traspassed = new VertexMap()
	while (true) { // TODO: don't assume all vertices are connected, limit by range?
		const [minVertexId, minDist] = minKey(dists)
		if (minDist > limitToDistance) break
		const minVertex = vertexFromId(minVertexId)
		if (areVerticesEquivalent(minVertex, toVertex)) {
			break
		}
		vertexNeighbors(minVertex).forEach((neighbor) => {
			if (traspassed.get(neighbor)) return
			const neighborDist = dists.get(neighbor) || Infinity
			const alt = dists.get(minVertex) + lengthBetweenVertices(blocks, neighbor, minVertex)
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

export function lengthBetweenVertices(blocks, vertexA, vertexB) {
	if (pathIsBlockedBetweenVertices(blocks, vertexA, vertexB)) {
		return Infinity
	} else {
		return 1
	}
}
