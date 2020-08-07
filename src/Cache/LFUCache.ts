type DBLKey = string | number | null
type DBLVal = string | number | boolean | null

/** Double Linked List Node built specifically for LFU Cache */
class DoubleLinkedListLFUNode<T = DBLVal> {
	freq: number
	next: DoubleLinkedListLFUNode | null
	prev: DoubleLinkedListLFUNode | null

	constructor(public key: DBLKey, public val: T) {
		this.key = key
		this.val = val
		this.freq = 0
		this.next = null
		this.prev = null
	}
}

/** Double Linked List built specifically for LFU Cache */
class DoubleLinkedListLFU {
	head: DoubleLinkedListLFUNode | null
	rear: DoubleLinkedListLFUNode | null

	constructor() {
		this.head = new DoubleLinkedListLFUNode(null, null)
		this.rear = new DoubleLinkedListLFUNode(null, null)
		this.head.next = this.rear
		this.rear.prev = this.head
	}

	_positionNode(node: DoubleLinkedListLFUNode) {
		// Helper function to position a node based on the frequency of the key
		while (node?.prev?.key && node.prev.freq > node.freq) {
			const node1 = node
			const node2 = node.prev
			node1.prev = node2.prev
			node2.next = node1.prev
			node1.next = node2
			node2.prev = node1
		}
	}

	add<T extends DBLVal = NonNullable<DBLVal>>(
		node: DoubleLinkedListLFUNode<T>
	) {
		// Adds the given node to the end of the list (before rear) and positions it based on frequency
		const temp = this.rear!.prev!
		temp.next = node
		node.prev = temp
		this.rear!.prev = node
		node.next = this.rear
		this._positionNode(node)
	}

	remove(node: DoubleLinkedListLFUNode) {
		// Removes and returns the given node from the list
		const tempLast = node.prev!
		const tempNext = node.next!
		node.prev = null
		node.next = null
		tempLast.next = tempNext
		tempNext.prev = tempLast

		return node
	}
}

interface LFUCacheObject {
	[key: string]: DoubleLinkedListLFUNode
}

/**
 * LFU Cache to store a given capacity of data
 * The Double Linked List is used to store the order of deletion from the cache
 * The rear.prev holds the most frequently used key and the head.next holds the least used key
 * When the number of elements reaches the capacity, the least frequently used item is removed before adding the next key
 */
export class LFUCache {
	private list: DoubleLinkedListLFU
	private numKeys: number
	private hits: number
	private miss: number
	private cache: LFUCacheObject

	constructor(private capacity: number) {
		this.list = new DoubleLinkedListLFU()
		this.capacity = capacity
		this.numKeys = 0
		this.hits = 0
		this.miss = 0
		this.cache = {}
	}

	cacheInfo() {
		// Return the details for the cache instance [hits, misses, capacity, current_size]
		return `CacheInfo(hits=${this.hits}, misses=${this.miss}, capacity=${this.capacity}, current size=${this.numKeys})`
	}

	set<T extends DBLVal = NonNullable<DBLVal>>(key: string | number, value: T) {
		// Sets the value for the input key and updates the Double Linked List
		if (!(key in this.cache)) {
			if (this.numKeys >= this.capacity) {
				const keyToDelete = this.list.head!.next!.key

				if (keyToDelete !== null) {
					this.list.remove(this.cache[keyToDelete])
					delete this.cache[keyToDelete]
					this.numKeys -= 1
				}
			}

			this.cache[key] = new DoubleLinkedListLFUNode(key, value)
			this.list.add(this.cache[key])
			this.numKeys += 1
		} else {
			const node = this.list.remove(this.cache[key])
			node.val = value
			this.list.add(node)
		}
	}

	get(key: string | number) {
		// Returns the value for the input key and updates the Double Linked List. Returns null if key is not present in cache
		if (key in this.cache) {
			this.hits += 1
			this.list.add(this.list.remove(this.cache[key]))

			return this.cache[key].val
		}

		this.miss += 1
		return null
	}
}

function isLFUCache<T extends LFUCache, U>(data: T | U): data is T {
	return typeof data !== 'undefined' && data instanceof LFUCache
}

function mainLFU() {
	// Example 1 (Small Cache)
	const cache = new LFUCache(2)
	cache.set(1, 1)
	cache.set(2, 2)

	console.log(cache.get(1))

	cache.set(3, 3)

	console.log(cache.get(2)) // cache miss

	cache.set(4, 4)

	console.log(cache.get(1)) // cache miss
	console.log(cache.get(3))
	console.log(cache.get(4))

	console.log('Example Cache: ', cache.cacheInfo(), '\n')

	// Example 2 (Computing Fibonacci Series - 100 terms)
	function fib(num: number, cache: LFUCache | null = null): number {
		if (isLFUCache(cache)) {
			const value = cache.get(num)
			if (value && typeof value === 'number') {
				return value
			}
		}

		if (num === 1 || num === 2) {
			return 1
		}

		const result = fib(num - 1, cache) + fib(num - 2, cache)

		if (cache instanceof LFUCache) {
			cache.set(num, result)
		}

		return result
	}

	const fibCache = new LFUCache(100)

	Array.from({ length: 100 }, (_, i) => i).forEach((i) => {
		fib(i, fibCache)
	})

	// for (let i = 1; i <= 100; i++) {
	// 	fib(i, fibCache)
	// }
	console.log('Fibonacci Series Cache: ', fibCache.cacheInfo(), '\n')
}

mainLFU()
