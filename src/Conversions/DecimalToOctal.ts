export function decimalToOctal(num: number): number {
	let oct = 0,
		c = 0,
		n = num,
		r

	while (n > 0) {
		r = n % 8
		oct += r * Math.pow(10, c++)
		n = ~~(n / 8) // basically /= 8 without remainder if any
	}

	return oct
	// console.log('The decimal in octal is ' + oct)
}

// decimalToOctal(2)
// decimalToOctal(8)
// decimalToOctal(65)
// decimalToOctal(216)
// decimalToOctal(512)
