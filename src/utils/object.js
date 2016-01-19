/**
 * Simple is object check.
 * @param {*} item The value to check if it's an object or not.
 * @returns {Boolean} True if the given value is an object.
 */
export function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item) && item !== null)
}

/**
 * Deep merge two objects.
 * @param {Object} target target object.
 * @param {Object} source source object.
 * @returns {Object} Deep merged object (source into target).
 */
export function deepMerge(target, source) {
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!target[key]) {
                    Object.assign(target, {
                        [key]: {}
                    })
                }
                deepMerge(target[key], source[key])
            } else {
                Object.assign(target, {
                    [key]: source[key]
                })
            }
        })
    }
    return target
}
