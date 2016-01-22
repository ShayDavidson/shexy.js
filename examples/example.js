(function() {
    var ctx = document.getElementById('canvas').getContext('2d');

    var cols = 7;
    var rows = 7;
    var scaleX = 1;
    var scaleY = 1;
    var radius = 30;
    var padding = 10;

    var options = {
       padding: padding,
       hex: {
           scaleX: scaleX,
           scaleY: scaleY,
           radius: radius
       }
    };

    var current;

    var coords = Shexy.Designer.getBoardHexCenters(rows, cols, options)

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        Shexy.Iterators.matrixColRowIterator(coords, function(coord, col, row) {
            var poly = Shexy.Designer.getHexVertices({
                radius: radius,
                scaleX: scaleX,
                scaleY: scaleY,
                centerX: coord.x,
                centerY: coord.y
            });
            var color;
            if (current && current.col == col && current.row == row) {
                color = 'gray'
            } else {
                color = 'red'
            }
            Shexy.CanvasUtils.drawPolygon(ctx, poly, {fillStyle: color, strokeWidth: 1});
        });
    }

    function getMousePos(canvas, event) {
        var rect = canvas.getBoundingClientRect();
        return {x: event.clientX - rect.left, y: event.clientY - rect.top};
    };

    canvas.addEventListener("mousemove", function(event) {
        var pos = getMousePos(canvas, event);
        current = Shexy.Designer.getColRowFromPosition(pos.x, pos.y, options);
        draw();
    });

    draw();
})()
