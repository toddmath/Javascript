type URGB = 'r' | 'g' | 'b'

type RGB = {
	[K in URGB]: number
}

export function hexStringToRGB(hexString: string): RGB {
	const r = hexString.substring(1, 3).toUpperCase()
	const g = hexString.substring(3, 5).toUpperCase()
	const b = hexString.substring(5, 7).toUpperCase()

	return { r: parseInt(r, 16), g: parseInt(g, 16), b: parseInt(b, 16) }
}

// console.log(hexStringToRGB('javascript rock !!'))
