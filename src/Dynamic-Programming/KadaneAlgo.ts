/**
 * Find largest contigous sum in an array
 * @param {Array<number>} array
 * @returns {number} largest contigous sum
 */
export function kadaneAlgo(array: Array<number>): number {
	let accSum = 0,
		maxSum = 0

	array.forEach((val) => {
		accSum += val
		if (accSum < 0) accSum = 0
		else if (maxSum < accSum) maxSum = accSum
	})

	// for (var i = 0; i < array.length; i++) {
	// 	cummulativeSum += array[i]
	// 	if (cummulativeSum < 0) cummulativeSum = 0
	// 	else if (maxSum < cummulativeSum) {
	// 		maxSum = cummulativeSum
	// 	}
	// }

	return maxSum
}

// TODO: implement test file:
// function main() {
// 	var myArray = [1, 2, 3, 4, -6]
// 	var result = kadaneAlgo(myArray)
// 	console.log(result)
// }

// main()
