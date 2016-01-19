"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getOpposite = getOpposite;
var ENUM = exports.ENUM = {
    top: 0,
    topRight: 1,
    botRight: 2,
    bot: 3,
    botLeft: 4,
    topLeft: 5
};

function getOpposite(dir) {
    return (dir + 3) % 6;
}
//# sourceMappingURL=direction.js.map