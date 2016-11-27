var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

var size = 20
var range = 1
var padding = 0
var camera = {
	center: Shexy.View.Point(canvas.width / 2, canvas.height / 2),
	zoom: 1
}
var currentHex

var grid = Shexy.Grid.Grid(range)

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	if (currentHex) {
		document.body.style.cursor = 'pointer'
	} else {
		document.body.style.cursor = 'auto'
	}
	Shexy.Grid.gridForEach(grid, function(hex) {
		var center = Shexy.View.axialToPoint(hex.coords.axial, size, padding)
		var corners = Shexy.View.hexCorners(center, size)
		corners = corners.map((corner) => {
			return Shexy.View.addPoints(corner, camera.center)
		})
		var color = currentHex && Shexy.Coords.areAxialsEqual(currentHex.coords.axial, hex.coords.axial) ? 'red' : 'gray'
		Shexy.Canvas.drawPolygon(ctx, corners, {fillStyle: color})
	})
}

function getMousePos(canvas, event) {
	var rect = canvas.getBoundingClientRect()
	return { x: event.clientX - rect.left, y: event.clientY - rect.top }
};

canvas.addEventListener("mousemove", function(event) {
	var pos = Shexy.View.subtractPoints(getMousePos(canvas, event), camera.center)
	var currentAxial = Shexy.View.pointToAxial(pos, size, padding)
	currentHex = Shexy.Grid.hexAt(grid, currentAxial)
	draw()
})

draw()
