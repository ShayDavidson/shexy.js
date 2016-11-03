export function getVerticesDirectionsByEdgeDirection(edgeDirection) {
	return [edgeDirection, (edgeDirection + 1) % 6]
}

export class Edge {
	constructor(direction) {
		this.direction = direction
	}
}
