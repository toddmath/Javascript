import { MinPriorityQueue } from './MinPriorityQueue'

describe('MinPriorityQueue', () => {
	test('should insert and sort correctly', () => {
		const q = new MinPriorityQueue(8)
		const data = [5, 2, 4, 1, 7, 6, 3, 8]
		data.forEach((n) => q.insert(n))

		expect(q.getHeap()).toEqual([1, 2, 3, 5, 7, 6, 4, 8]) // [ 1, 2, 3, 5, 7, 6, 4, 8 ]
		q.heapSort()
		expect(q.getHeap()).toEqual([8, 7, 6, 5, 4, 3, 2, 1]) // [ 8, 7, 6, 5, 4, 3, 2, 1 ]
	})
})
