import { mod } from './utils'

export const HEX_RANGE = [0, 1, 2, 3, 4, 5]

export function hexMod(i) {
	return mod(i, 6)
}
