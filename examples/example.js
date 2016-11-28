const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const seed = 7060
const size = 22
const range = 5
const padding = 7
const vertexWidth = 4
const camera = {
	center: Shexy.View.Point(canvas.width / 2, canvas.height / 2),
	zoom: 1
}

let mode = 'path'
let selectedHex = undefined
let currentHex = undefined
let selectedVertex = 0
let currentVertex = 0
const grid = Shexy.Grid.Grid(range, Shexy.Random.getRNG(seed))

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

	if (mode === 'path' && currentHex && selectedHex) {
		const vertexA = Shexy.Coords.Vertex(selectedHex.coords.cube, selectedVertex)
		const vertexB = Shexy.Coords.Vertex(currentHex.coords.cube, currentVertex)
		const path = Shexy.Grid.shortestPathFrom(grid, vertexA, vertexB)
		path.forEach((vertex) => drawVertex(vertex))
		drawPath(path)
		drawVertex(vertexA, true)
		drawVertex(vertexB, true)
	}
}

function drawVertex(vertex, selected = false) {
	const point = Shexy.View.addPoints(Shexy.View.vertexToPoint(vertex, size, padding), camera.center)
	ctx.beginPath()
	ctx.fillStyle = selected ? 'white' : 'black'
	ctx.lineWidth = selected ? 0 : vertexWidth
	ctx.strokeStyle = 'black'
	const radius = selected ? vertexWidth * 2 : vertexWidth / 2
	ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI, false)
	ctx.fill()
	if (selected) ctx.stroke()
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
	const axial = Shexy.View.pointToAxial(pos, size, padding)
	const vertex = Shexy.View.pointToCornerInAxial(pos, axial, size, padding)
	return [axial, vertex]
}

document.getElementsByName('mode').forEach((radio) => {
	radio.addEventListener('click', () => {
		mode = radio.value
		draw()
	})
})

canvas.addEventListener('mousemove', (event) => {
	const [point, vertex] = getAxialAtEvent(event)
	const newCurrentHex = Shexy.Grid.hexAt(grid, point)
	newCurrentVertex = vertex
	if ((newCurrentHex !== selectedHex && newCurrentHex !== currentHex) || newCurrentVertex !== currentVertex){
		currentHex = newCurrentHex
		currentVertex = newCurrentVertex
		draw()
	}
})

canvas.addEventListener('click', (event) => {
	const [point, vertex] = getAxialAtEvent(event)
	newSelectedHex = Shexy.Grid.hexAt(grid, point)
	newSelectedVertex = vertex
	if (newSelectedHex !== selectedHex || newSelectedVertex !== selectedVertex) {
		selectedHex = newSelectedHex
		selectedVertex = newSelectedVertex
		draw()
	}
})

draw()
