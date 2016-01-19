export const ENUM = {
    top: 0,
    topRight: 1,
    botRight: 2,
    bot: 3,
    botLeft: 4,
    topLeft: 5
}

export function getOpposite(dir) {
    return (dir + 3) % 6
}
