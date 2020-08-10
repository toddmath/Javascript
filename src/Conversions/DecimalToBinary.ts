export function decimalToBinary(num: number) {
	let bin: number[] = []
	while (num > 0) {
		bin.unshift(num % 2)
		num >>= 1 // basically /= 2 without remainder if any
	}
	// console.log('The decimal in binary is ' + bin.join(''))
	return bin.join('')
}
