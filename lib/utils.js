export function mod(i, n) {
	return ((i % n) + n) % n
}

export function minKey(obj) {
	let minKey
	let minValue = Infinity
	Object.keys(obj).forEach((key) => {
		const value = obj[key]
		if (value < minValue) {
			minKey = key
			minValue = value
		}
	})
	return [minKey, minValue]
}
