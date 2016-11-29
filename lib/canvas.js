export function drawPolygon(ctx, vertices, options) {
	ctx.beginPath()
	ctx.moveTo(vertices[0].x, vertices[0].y)

	for (let i = 1; i < vertices.length; i++) {
		ctx.lineTo(vertices[i].x, vertices[i].y)
	}
	ctx.lineTo(vertices[0].x, vertices[0].y)

	if (options.fillStyle) {
		ctx.fillStyle = options.fillStyle
		ctx.fill()
	}

	if (options.strokeStyle) {
		ctx.lineWidth = options.strokeWidth || 1
		ctx.strokeStyle = options.strokeStyle
		ctx.stroke()
	}
}

export function drawLine(ctx) {
	ctx.beginPath()
	ctx.moveTo(vertices[0].x, vertices[0].y)

	for (let i = 1; i < vertices.length; i++) {
		ctx.lineTo(vertices[i].x, vertices[i].y)
	}
	ctx.lineTo(vertices[0].x, vertices[0].y)

	if (options.fillStyle) {
		ctx.fillStyle = options.fillStyle
		ctx.fill()
	}

	if (options.strokeStyle) {
		ctx.lineWidth = options.strokeWidth || 1
		ctx.strokeStyle = options.strokeStyle
		ctx.stroke()
	}
}
