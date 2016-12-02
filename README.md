# shexy.js

## Terminology

Shexy.js is built with point-top hexagons in mind.

### Grid

An Hex grid represented by a [q][r] 2-dimensional hash (where the q and r are a Hex's corresponding Axial coords).

### Hex

An object representing an hexagon in a game, along with its Axial coords and additional data.

### Axial

A hex coords representation by `q` and `r` (column and row respectively).

### Cube

Another hex coords representation by `x`, `y` and `z`. Can be derived by an Axial easily. Used to calculate some things that are harder with Axials.

### Vertex

A corner on a hex, represented by its Axials and
A single Vertex is shared between 3 Axials.

### Segment Direction

An integer (0..5) indicating the direction of a hexagon's segment.

### Neighbor

An Axial which shares a segment with another Axial.

### Diagonal Direction

A integer (0..5) indicating the direction of a hexagon's corner

### Diagonal

An Axial which is positioned across the Vertex Path from the ...

### Barricade

### Vertex Path
