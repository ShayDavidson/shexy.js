(function() {
    var ctx = document.getElementById('canvas').getContext('2d');

    var cols = 7;
    var rows = 7;
    var scaleX = 1;
    var scaleY = 1;
    var radius = 30;
    var padding = 5;

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
        Shexy.CanvasUtils.drawPolygon(ctx, poly, {fillStyle: 'red', strokeWidth: 3});
    });
})()
