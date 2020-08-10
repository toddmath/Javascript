/**
 * Calculates prime numbers till a number n
 * @param {number} n Number upto which to calculate primes
 * @returns {Array<boolean>} A boolean list contaning only primes
 */
export function sieveOfEratosthenes(n: number): boolean[] {
	const primes = Array.from({ length: n + 1 }, (_, i) =>
		i === 0 || i === 1 ? false : true
	)
	const sqrtn = Math.ceil(Math.sqrt(n))

	for (let i = 2; i <= sqrtn; i++) {
		if (primes[i]) {
			for (let j = 2 * i; j <= n; j += i) {
				primes[j] = false
			}
		}
	}

	return primes
}

// TODO: implement test file:
// function main() {
// 	const n = 69 // number till where we wish to find primes
// 	const primes = sieveOfEratosthenes(n)
// 	for (let i = 2; i <= n; i++) {
// 		if (primes[i]) {
// 			console.log(i)
// 		}
// 	}
// }

// main()
