(function() {
    var ctx = document.getElementById('canvas').getContext('2d');

    var cols = 7;
    var rows = 7;
    var scaleX = 1;
    var scaleY = 1;
    var radius = 30;
    var padding = 5;

    function drawPolygon(ctx, vertices) {
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.beginPath();
        ctx.moveTo(vertices[0].x, vertices[0].y);
        for (var i = 1; i < vertices.length; i++) {
            ctx.lineTo(vertices[i].x, vertices[i].y);
        }
        ctx.lineTo(vertices[0].x, vertices[0].y);

        ctx.fill();
        ctx.stroke();
    }

    var coords = Shexy.Designer.getBoardHexCenters(rows, cols, {
       padding: padding,
       hex: {
           radius: radius
       }
    })

    Shexy.Iterators.colRowIterator(rows, cols, function(row, col) {
        var coord =  coords[row][col];
        var poly = Shexy.Designer.getHexVertices({
            radius: radius,
            scaleX: scaleX,
            scaleY: scaleY,
            centerX: coord.x,
            centerY: coord.y
        });
        drawPolygon(ctx, poly);
    });
})()
