export function randomFloat(min = 0, max = 1, rndFunc) {
	rndFunc = rndFunc || Math.random
	return rndFunc() * (max - min) + min
}

export function randomInteger(min = 0, max = 1, rndFunc) {
	rndFunc = rndFunc || Math.random
	return Math.floor(randomFloat(min, max, rndFunc))
}

export function randomBoolean(rndFunc) {
	return rndFunc() > 0.5
}

export function randomString(rndFunc) {
	return rndFunc().toString(36).substring(7)
}

export function randomSample(array, rndFunc) {
	return array[randomInteger(0, array.length, rndFunc)]
}

export function randomByWeights(weights, rndFunc) {
	const keys = Object.keys(weights)
	const sortedKeysByWeights = keys.sort((a, b) => weights[a] - weights[b])
	const sortedWeights = sortedKeysByWeights.map((val) => weights[val])
	const	accumulatedWeights = sortedWeights.reduce((accumulated, currentValue, index) => {
		return [ ...accumulated, currentValue + (accumulated[index - 1] || 0) ]
	}, [])
	const totalWeight = accumulatedWeights[accumulatedWeights.length - 1]
	const randomInt = randomInteger(0, totalWeight, rndFunc)
	const matchingRangeIndex = accumulatedWeights.findIndex((accumulatedWeight) => randomInt < accumulatedWeight)
	return sortedKeysByWeights[matchingRangeIndex]
}

export function seededRandom(seed) {
	let x = Math.sin(seed) * 10000
	return x - Math.floor(x)
}

export function getRNG(seed) {
	let incrementedSeed = seed
	let counter = 0

	return {
		reset() {
			counter = 0
			incrementedSeed = seed
		},
		getSeed() {
			return seed
		},
		getCounter() {
			return counter
		},
		random() {
			counter++
			return seededRandom(incrementedSeed++)
		},
		randomFloat(min, max) {
			return randomFloat(min, max, this.random)
		},
		randomInteger(min, max) {
			return randomInteger(min, max, this.random)
		},
		randomBoolean() {
			return randomBoolean(this.random)
		},
		randomString() {
			return randomString(this.random)
		},
		randomSample(array) {
			return randomSample(array, this.random)
		},
		randomByWeights(weights) {
			return randomByWeights(weights, this.random)
		}
	}
}
