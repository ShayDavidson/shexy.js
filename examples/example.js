const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const size = 22
const range = 5
const padding = 7
const vertexWidth = 4
const camera = {
	center: Shexy.View.Point(canvas.width / 2, canvas.height / 2),
	zoom: 1
}
let selectedHex = undefined
let currentHex = undefined
const grid = Shexy.Grid.Grid(range)

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	if (currentHex) {
		document.body.style.cursor = 'pointer'
	} else {
		document.body.style.cursor = 'auto'
	}
	Shexy.Grid.gridForEachHex(grid, (hex) => {
		const center = Shexy.View.axialToPoint(hex.coords.axial, size, padding)
		let corners = Shexy.View.hexCorners(center, size)
		corners = corners.map((corner) => {
			return Shexy.View.addPoints(corner, camera.center)
		})
		let color
		if (selectedHex && Shexy.Coords.areAxialsEqual(selectedHex.coords.axial, hex.coords.axial)) {
		 color = 'blue'
		} else if (currentHex && Shexy.Coords.areAxialsEqual(currentHex.coords.axial, hex.coords.axial)) {
			color = 'red'
		} else {
			color = 'gray'
		}
		Shexy.Canvas.drawPolygon(ctx, corners, {fillStyle: color})
	})

	if (currentHex && selectedHex) {
		const vertexA = Shexy.Coords.Vertex(selectedHex.coords.cube, 0)
		const vertexB = Shexy.Coords.Vertex(currentHex.coords.cube, 0)
		const path = Shexy.Grid.shortestPathFrom(grid, vertexA, vertexB)
		ctx.lineWidth = 0
		path.forEach(drawVertex)
		drawPath(path)
	}
}

function drawVertex(vertex) {
	const point = Shexy.View.addPoints(Shexy.View.vertexToPoint(vertex, size, padding), camera.center)
	ctx.beginPath()
	ctx.fillStyle = 'black'
	ctx.lineWidth = 0
	ctx.arc(point.x, point.y, vertexWidth / 2, 0, 2 * Math.PI, false)
	ctx.fill()
}

function drawPath(path) {
	for (let i = 0; i < path.length - 1; i++) {
		const point = Shexy.View.addPoints(Shexy.View.vertexToPoint(path[i], size, padding), camera.center)
		const nextPoint = Shexy.View.addPoints(Shexy.View.vertexToPoint(path[i + 1], size, padding), camera.center)
		ctx.lineWidth = vertexWidth
		ctx.strokeStyle = 'black'
		ctx.moveTo(point.x, point.y)
		ctx.lineTo(nextPoint.x, nextPoint.y)
		ctx.stroke()
	}
}

function getMousePos(canvas, event) {
	const rect = canvas.getBoundingClientRect()
	return { x: event.clientX - rect.left, y: event.clientY - rect.top }
}

function getAxialAtEvent(event) {
	const pos = Shexy.View.subtractPoints(getMousePos(canvas, event), camera.center)
	return Shexy.View.pointToAxial(pos, size, padding)
}

canvas.addEventListener('mousemove', (event) => {
	const newCurrentHex = Shexy.Grid.hexAt(grid, getAxialAtEvent(event))
	if (newCurrentHex !== selectedHex && newCurrentHex !== currentHex) {
		currentHex = newCurrentHex
		draw()
	}
})

canvas.addEventListener('click', (event) => {
	newSelectedHex = Shexy.Grid.hexAt(grid, getAxialAtEvent(event))
	if (newSelectedHex !== selectedHex) {
		selectedHex = newSelectedHex
		draw()
	}
})

draw()
