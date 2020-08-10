/**
 * Find the maximum non-adjacent sum of the integers in the nums input list
 * @param {Array<numbers>} nums Array of Numbers
 * @return {number} The maximum non-adjacent sum
 */
export function maximumNonAdjacentSum(nums: Array<number>): number {
	if (nums.length < 0) return 0

	let [maxIncluding] = nums
	let maxExcluding = 0
	let temp: number

	for (const num of nums.slice(1)) {
		temp = maxIncluding
		maxIncluding += num
		maxExcluding = Math.max(temp, maxExcluding)
	}

	return Math.max(maxExcluding, maxIncluding)
}

// TODO: implement test file:
// function main() {
// 	console.log(maximumNonAdjacentSum([1, 2, 3]))
// 	console.log(maximumNonAdjacentSum([1, 5, 3, 7, 2, 2, 6]))
// 	console.log(maximumNonAdjacentSum([-1, -5, -3, -7, -2, -2, -6]))
// 	console.log(maximumNonAdjacentSum([499, 500, -3, -7, -2, -2, -6]))
// }

// main()
