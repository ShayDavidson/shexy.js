import { Point, axialToPoint, pointToAxial, hexCorners, addPoints, subtractPoints, vertexToPoint, pointToCornerInAxial, axialsToPathCorners } from 'lib/hex_view'
import { Grid, gridForEachHex, shortestPathFrom, hexAt, addBlocksBetweenAxials, removeBlocksBetweenAxials, pathIsBlockedBetweenAxials } from 'lib/hex_grid'
import { Vertex, areAxialsEqual, areAxialsNeighbors, axialNeighbors } from 'lib/hex_coords'
import { drawPolygon } from 'lib/canvas'
import Stats from 'stats.js'

const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

const range = 5
const distanceLimit = 40

let size = 22
let padding = 7
let vertexWidth = 4

const camera = {
	center: Point(canvas.width / 2, canvas.height / 2),
	zoom: 1
}

let mode = 'path'
let selectedHex
let currentHex
let selectedVertex = 0
let currentVertex = 0
const grid = Grid(range)
const blocks = {}
window.blocks = blocks

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	if (currentHex) {
		document.body.style.cursor = 'pointer'
	} else {
		document.body.style.cursor = 'auto'
	}
	gridForEachHex(grid, (hex) => {
		const center = axialToPoint(hex.axial, size, padding)
		let corners = hexCorners(center, size)
		corners = corners.map((corner) => {
			return addPoints(corner, camera.center)
		})
		let color
		if (selectedHex && areAxialsEqual(selectedHex.axial, hex.axial)) {
			color = 'blue'
		} else if (currentHex && areAxialsEqual(currentHex.axial, hex.axial)) {
			color = 'red'
		} else {
			color = 'gray'
		}
		drawPolygon(ctx, corners, {fillStyle: color})

		axialNeighbors(hex.axial).forEach((neighbor) => {
			if (pathIsBlockedBetweenAxials(blocks, neighbor, hex.axial)) {
				let blockCorners = axialsToPathCorners(hex.axial, neighbor, size, padding)
				blockCorners = blockCorners.map((corner) => addPoints(corner, camera.center))
				drawPolygon(ctx, blockCorners, {fillStyle: 'gray'})
			}
		})
	})

	if (mode === 'path' && currentHex && selectedHex) {
		const vertexA = Vertex(selectedHex.axial, selectedVertex)
		const vertexB = Vertex(currentHex.axial, currentVertex)
		const path = shortestPathFrom(grid, blocks, vertexA, vertexB, distanceLimit)
		path.forEach((vertex) => drawVertex(vertex))
		drawPath(path)
		drawVertex(vertexA, true)
		drawVertex(vertexB, true)
	}
}

function drawVertex(vertex, selected = false) {
	const point = addPoints(vertexToPoint(vertex, size, padding), camera.center)
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
		const point = addPoints(vertexToPoint(path[i], size, padding), camera.center)
		const nextPoint = addPoints(vertexToPoint(path[i + 1], size, padding), camera.center)
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
	const pos = subtractPoints(getMousePos(canvas, event), camera.center)
	const axial = pointToAxial(pos, size, padding)
	const vertex = pointToCornerInAxial(pos, axial, size, padding)
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
	const newCurrentHex = hexAt(grid, point)
	const newCurrentVertex = vertex
	if ((newCurrentHex !== selectedHex && newCurrentHex !== currentHex) || newCurrentVertex !== currentVertex) {
		currentHex = newCurrentHex
		currentVertex = newCurrentVertex
		draw()
	}
})

canvas.addEventListener('click', (event) => {
	const [point, vertex] = getAxialAtEvent(event)
	const newSelectedHex = hexAt(grid, point)
	const newSelectedVertex = vertex
	if (newSelectedHex !== selectedHex || newSelectedVertex !== selectedVertex) {
		if (mode === 'block' && selectedHex && currentHex) {
			if (areAxialsNeighbors(selectedHex.axial, currentHex.axial)) {
				if (pathIsBlockedBetweenAxials(blocks, selectedHex.axial, currentHex.axial)) {
					removeBlocksBetweenAxials(blocks, selectedHex.axial, currentHex.axial)
				} else {
					addBlocksBetweenAxials(blocks, selectedHex.axial, currentHex.axial)
				}
			}
		}
		selectedHex = newSelectedHex
		selectedVertex = newSelectedVertex
		draw()
	}
})

draw()

const stats = new Stats()
stats.showPanel(0)
document.body.appendChild(stats.dom)
function animateStats() {
	stats.begin()
	stats.end()
	window.requestAnimationFrame(animateStats)
}

window.requestAnimationFrame(animateStats)
