/**
 * quickSelect is an algorithm to find the kth smallest number
 *
 * Notes:
 * -quickSelect is related to QuickSort, thus has optimal best and average
 *  case (O(n)) but unlikely poor worst case (O(n^2))
 * -This implementation uses randomly selected pivots for better performance
 *
 * @complexity: O(n) (on average)
 * @complexity: O(n^2) (worst case)
 */

// TODO: Added default param to kth, ??
export function quickSelect<T extends number>(items: T[], kth: number = 0) {
	return randomizedSelect(items, 0, items.length - 1, kth)
}

export function randomizedSelect<T extends number>(
	items: T[],
	left: number,
	right: number,
	i: number
): number {
	if (left === right) return items[left]

	const pivotIndex = randomizedPartition(items, left, right)
	const k = pivotIndex - left + 1

	if (i === k) return items[pivotIndex]
	if (i < k) return randomizedSelect(items, left, pivotIndex - 1, i)

	return randomizedSelect(items, pivotIndex + 1, right, i - k)
}

function randomizedPartition<T extends number>(
	items: T[],
	left: number,
	right: number
): number {
	const rand: number = getRandomInt(left, right)
	swap(items, rand, right)

	return partition(items, left, right)
}

function partition<T extends number>(
	items: T[],
	left: number,
	right: number
): number {
	const x = items[right]
	let pivotIndex = left - 1

	for (let j = left; j < right; j++) {
		if (items[j] <= x) {
			pivotIndex++
			swap(items, pivotIndex, j)
		}
	}

	swap(items, pivotIndex + 1, right)

	return pivotIndex + 1
}

function getRandomInt(min: number, max: number): number {
	return ~~(Math.random() * (max - min + 1)) + min
}

function swap<T extends unknown>(arr: T[], x: number, y: number): void {
	;[arr[x], arr[y]] = [arr[y], arr[x]]
}

// testing
console.log(quickSelect([1, 4, 2, -2, 4, 5]))
