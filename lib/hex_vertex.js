import { HEX_RANGE, hexMod } from './hex_utils'
import { Axial, addAxials, areAxialsEqual, axialsSharingDiagonal, axialDiagonalAtDirection, sharedAxialsDirection, axialId } from './hex_axial'

export function Vertex(axial, i) {
	return { axial, i: hexMod(i) }
}

export function vertexId(vertex) {
	return `${axialId(vertex.axial)}:${vertex.i}`
}

export function vertexUid(vertex) {
	const equivIds = sortedEquivalentVerticesIds(vertex)
	return equivIds[0]
}

export function vertexFromId(id) {
	const [axial, i] = id.split(':')
	const [q, r] = axial.split(',')
	return Vertex(Axial(parseInt(q), parseInt(r)), parseInt(i))
}

export function addVertices(vertexA, vertexB) {
	return Vertex(addAxials(vertexA.axial, vertexB.axial), vertexA.i + vertexB.i)
}

export function areVerticesEqual(vertexA, vertexB) {
	return areAxialsEqual(vertexA.axial, vertexB.axial) && vertexA.i === vertexB.i
}

export function areVerticesEquivalent(vertexA, vertexB) {
	return !!equivalentVertices(vertexA).find((equivalentVertex) => areVerticesEqual(equivalentVertex, vertexB))
}

export function equivalentVertices(vertex) {
	const shared = axialsSharingDiagonal(vertex.axial, vertex.i).map((axial, index) => Vertex(axial, vertex.i + (index + 1) * 2))
	return [ vertex, ...shared ]
}

export function sortedEquivalentVerticesIds(vertex) {
	return equivalentVertices(vertex).map(vertexId).sort()
}

export function vertexNeighbors(vertex) {
	return [
		Vertex(vertex.axial, vertex.i - 1),
		Vertex(axialDiagonalAtDirection(vertex.axial, vertex.i), vertex.i + 3),
		Vertex(vertex.axial, vertex.i + 1)
	]
}

export function axialVertices(axial) {
	return HEX_RANGE.map((i) => Vertex(axial, i))
}

export function verticesSharingAxials(axialA, axialB) {
	const direction = sharedAxialsDirection(axialA, axialB)
	if (direction) {
		return [Vertex(axialA, direction - 1), Vertex(axialA, direction)]
	} else {
		return []
	}
}

export class VertexMap {
	set(vertex, value) {
		this[vertexUid(vertex)] = value
	}

	get(vertex) {
		this[vertexUid(vertex)]
	}

	delete(vertex) {
		this[vertexUid(vertex)]
	}
}
