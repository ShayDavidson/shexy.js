export default {
    TOP: 0,
    TOP_RIGHT: 1,
    BOT_RIGHT: 2,
    BOT: 3,
    BOT_LEFT: 4,
    TOP_LEFT: 5,

    getOppositeDirection(dir) {
        return (dir + 3) % 6
    }
}
