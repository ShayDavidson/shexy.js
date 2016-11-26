var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

var size = 20
var range = 5
var padding = 0
var camera = {
	center: Shexy.View.Point(canvas.width / 2, canvas.height / 2),
	zoom: 1
}

var grid = Shexy.Grid.Grid(range)
Shexy.Grid.gridForEach(grid, function(hex) {
	const center = Shexy.View.axialToPoint(hex.coords.axial, size, padding)
	let corners = Shexy.View.hexCorners(center, size)
	corners = corners.map((corner) => {
		return Shexy.View.addPoints(corner, camera.center)
	})
	Shexy.Canvas.drawPolygon(ctx, corners, {fillStyle: 'red'})
})

function draw() {
// 	var hover = false
// 	ctx.clearRect(0, 0, canvas.width, canvas.height);
// 	Shexy.Iterators.matrixEach(coords, function(coord, col, row) {
// 		var poly = Shexy.Designer.getHexVertices({
// 			radius: radius,
// 			scaleX: scaleX,
// 			scaleY: scaleY,
// 			centerX: coord.x,
// 			centerY: coord.y
// 		});
// 		var color;
// 		if (current && current.col == col && current.row == row) {
// 			hover = true
// 			color = 'gray'
// 		} else {
// 			color = 'red'
// 		}
// 		Shexy.CanvasUtils.drawPolygon(ctx, poly, {fillStyle: color});
// 	});
//
// 	if (hover) {
// 		document.body.style.cursor = 'pointer'
// 	} else {
// 		document.body.style.cursor = 'auto'
// 	}
// }
//
// function getMousePos(canvas, event) {
// 	var rect = canvas.getBoundingClientRect();
// 	return {x: event.clientX - rect.left, y: event.clientY - rect.top};
// };
//
// canvas.addEventListener("mousemove", function(event) {
// 	var pos = getMousePos(canvas, event);
// 	current = Shexy.Designer.getColRowFromPosition(pos.x, pos.y, options);
// 	draw();
// });
//
// console.log(Shexy.Designer.getBoardVerticesCenters(cols, rows, options));

	draw();
}
