const values = {
	I: 1,
	V: 5,
	X: 10,
	L: 50,
	C: 100,
	D: 500,
	M: 1000,
} as RomanNumeralMap

type RNValue = 1 | 5 | 10 | 50 | 100 | 500 | 1000

interface RomanNumeralMap {
	readonly [key: string]: RNValue
}

export function romanToDecimal(romanNumber: string) {
	let prev = ' ',
		sum = 0,
		newPrev = 0

	romanNumber
		.split('')
		.reverse()
		.forEach((char) => {
			if (prev !== ' ') {
				newPrev = values[prev] > newPrev ? values[prev] : newPrev
			}

			const currentNum = values[char]
			if (currentNum >= newPrev) sum += currentNum
			else sum -= currentNum

			prev = char
		})

	// for (let i = romanNumber.length - 1; i >= 0; i--) {
	// 	const c = romanNumber.charAt(i)
	// 	if (prev !== ' ') {
	// 		newPrev = values[prev] > newPrev ? values[prev] : newPrev
	// 	}
	// 	const currentNum = values[c]
	// 	if (currentNum >= newPrev) {
	// 		sum += currentNum
	// 	} else {
	// 		sum -= currentNum
	// 	}
	// 	prev = c
	// }

	return sum
}

// console.log(romanToDecimal('XXIIVV'))
// console.log(romanToDecimal('MDCCCIV'))
// console.log(romanToDecimal('XXIVI'))
