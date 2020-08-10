// Functions: insert, delete, peek, isEmpty, print, heapSort, sink

/**
 * Minimum Priority Queue
 * It is a part of heap data structure. A heap is a specific tree based data structure
 * in which all the nodes of tree are in a specific order. The children are
 * arranged either greater, or less than their parent. Thus, it's either a min,
 * or max priority queue.
 */
export class MinPriorityQueue {
	public capacity: number
	private heap: Array<number>
	private size: number

	constructor(c: number) {
		this.heap = []
		this.capacity = c
		this.size = 0
	}

	// inserts the key at the end and rearranges it
	// so that the binary heap is in appropriate order
	insert(key: number) {
		if (this.isFull) return
		this.heap[this.size + 1] = key
		let k = this.size + 1
		while (k > 1) {
			if (this.heap[k] < this.heap[Math.floor(k / 2)]) {
				const temp = this.heap[k]
				this.heap[k] = this.heap[Math.floor(k / 2)]
				this.heap[Math.floor(k / 2)] = temp
			}
			k = Math.floor(k / 2)
		}
		this.size++
	}

	// returns the highest priority value
	peek() {
		return this.heap[1]
	}

	// returns boolean value whether the heap is empty or not
	isEmpty() {
		return this.size === 0
	}

	// returns boolean value whether the heap is full or not
	get isFull() {
		if (this.size === this.capacity) return true
		return false
	}

	getHeap() {
		return this.heap.slice(1)
	}

	// prints the heap
	print() {
		console.log(this.heap.slice(1))
	}

	// heap sorting can be done by performing
	// delete function to the number of times of the size of the heap
	// it returns reverse sort because it is a min priority queue
	heapSort() {
		for (let i = 1; i < this.capacity; i++) {
			this.delete()
		}
	}

	// this function reorders the heap after every delete function
	sink(): void {
		let k = 1
		while (2 * k <= this.size || 2 * k + 1 <= this.size) {
			let minIndex
			if (this.heap[2 * k] >= this.heap[k]) {
				if (2 * k + 1 <= this.size && this.heap[2 * k + 1] >= this.heap[k]) {
					break
				} else if (2 * k + 1 > this.size) {
					break
				}
			}

			if (2 * k + 1 > this.size) {
				minIndex = this.heap[2 * k] < this.heap[k] ? 2 * k : k
			} else {
				if (
					this.heap[k] > this.heap[2 * k] ||
					this.heap[k] > this.heap[2 * k + 1]
				) {
					minIndex = this.heap[2 * k] < this.heap[2 * k + 1] ? 2 * k : 2 * k + 1
				} else {
					minIndex = k
				}
			}

			const temp = this.heap[k]
			this.heap[k] = this.heap[minIndex]
			this.heap[minIndex] = temp
			k = minIndex
		}
	}

	// deletes the highest priority value from the heap
	delete() {
		const min = this.heap[1]
		this.heap[1] = this.heap[this.size]
		this.heap[this.size] = min
		this.size--
		this.sink()

		return min
	}
}
