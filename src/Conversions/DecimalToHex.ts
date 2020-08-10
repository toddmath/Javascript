// TODO move this to utils folder
/** Utility function to create a K:V from a list of strings */
function strEnum<T extends string>(o: Array<T>): { [K in T]: K } {
	return o.reduce((res, key) => {
		res[key] = key
		return res
	}, Object.create(null))
}

export function decimalToHex(num: number) {
	let n = num

	if (n < 0) {
		n += 0xffffffff + 1
		// n = 0xffffffff + n + 1
	}

	return n.toString(16).toUpperCase()
}
