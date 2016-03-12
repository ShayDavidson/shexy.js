export function reverse(object) {
    let reversedObject = {}
    Object.keys(object).forEach((key) => {
        reversedObject[object[key]] = key
    })
    return reversedObject
}
