/**
 * Given an array of non-negative integers and a value sum, determines the total
 * number of the subset with sum equal to the given sum.
 * - `O(n*sum)` time complexity
 * - `O(sum)` space complexity
 */
export function numberOfSubsetSum(array: Array<number>, sum: number) {
	const dp = Array.from({ length: sum }, (_, i) => (i === 0 ? 1 : 0))

	// const dp: Array<number> = []
	// for (let i = 1; i <= sum; i++) {
	// 	dp[i] = 0
	// }
	// dp[0] = 1 // since sum equal to 0 is always possible with no element in subset

	array.forEach((elem) => {
		for (let j = sum; j >= elem; j--) {
			if (j - elem >= 0) dp[j] += dp[j - elem]
		}
	})

	// for (const element of array) {
	// 	for (let j = sum; j >= element; j--) {
	// 		if (j - element >= 0) {
	// 			dp[j] += dp[j - element]
	// 		}
	// 	}
	// }

	return dp[sum]
}

// TODO: implement test file:
// function main() {
// 	const array = [1, 1, 2, 2, 3, 1, 1]
// 	const sum = 4
// 	const result = numberOfSubsetSum(array, sum)
// 	console.log(result)
// }
// main()
