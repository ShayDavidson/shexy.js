// class Point {
//     constructor(x = 0, y = 0) {
//         this.x = x;
//         this.y = y;
//     }
//
//     multiply(val) {
//         return new Point(this.x * val, this.y * val);
//     }
// }
//
// const NORMALIZED_HEX_COORDINATES = [
//     new Point(-0.5, -0.866),
//     new Point(0.5, -0.866),
//     new Point(1, 0),
//     new Point(0.5, 0.866),
//     new Point(-0.5, 0.866),
//     new Point(-1, 0),
// ];
//
// export default {
//     drawHex(options) {
//         let points = NORMALIZED_HEX_COORDINATES.map((point) => {
//             return point.multiply(options.radius);
//         });
//     }
// };
