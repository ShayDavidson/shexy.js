const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const size = 20
const range = 4
const padding = 10
const camera = {
	center: Shexy.View.Point(canvas.width / 2, canvas.height / 2),
	zoom: 1
}
let selectedHex = null
let currentHex = null
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
			// const vertices = Shexy.Coords.cubeVertices(hex.coords.cube)
			// vertices.forEach((vertex) => {
			// 	let point = Shexy.View.vertexToPoint(vertex, size, padding)
			// 	point = Shexy.View.addPoints(point, camera.center)
			// 	ctx.beginPath()
			// 	ctx.fillStyle = 'blue'
			// 	ctx.arc(point.x, point.y, padding / 2, 0, 2 * Math.PI, false)
			// 	ctx.stroke()
			// })
		} else {
			color = 'gray'
		}
		Shexy.Canvas.drawPolygon(ctx, corners, {fillStyle: color})
	})
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
	currentHex = Shexy.Grid.hexAt(grid, getAxialAtEvent(event))
	draw()
})

canvas.addEventListener('click', (event) => {
	selectedHex = Shexy.Grid.hexAt(grid, getAxialAtEvent(event))
	draw()
})

draw()
