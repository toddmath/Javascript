type DBLKeyLRU = string | number | null
type DBLValLRU = string | number | boolean | null
type NonNullKeyDBLLRU = NonNullable<DBLKeyLRU>
type NonNullValDBLLRU = NonNullable<DBLValLRU>

/** Double Linked List Node built specifically for LRU Cache */
class DoubleLinkedListLRUNode<K = DBLKeyLRU, V = DBLValLRU> {
	next: DoubleLinkedListLRUNode | null
	prev: DoubleLinkedListLRUNode | null

	constructor(public key: K, public val: V) {
		this.key = key
		this.val = val
		this.next = null
		this.prev = null
	}
}

/** Double Linked List built specifically for LRU Cache */
class DoubleLinkedListLRU {
	head: DoubleLinkedListLRUNode
	rear: DoubleLinkedListLRUNode

	constructor() {
		this.head = new DoubleLinkedListLRUNode(null, null)
		this.rear = new DoubleLinkedListLRUNode(null, null)
		this.head.next = this.rear
		this.rear.prev = this.head
	}

	/** Adds the given node to the end of the list (before rear) */
	add(node: DoubleLinkedListLRUNode) {
		const temp = this.rear.prev!
		temp.next = node
		node.prev = temp
		this.rear.prev = node
		node.next = this.rear
	}

	/** Removes and returns the given node from the list */
	remove(node: DoubleLinkedListLRUNode) {
		const tempLast = node.prev!
		const tempNext = node.next!
		node.prev = null
		node.next = null
		tempLast.next = tempNext
		tempNext.prev = tempLast

		return node
	}
}

interface LRUCacheObject {
	[key: string]: DoubleLinkedListLRUNode
}

/** LRU Cache to store a given capacity of data */
export class LRUCache {
	public list: DoubleLinkedListLRU
	private numKeys: number
	private hits: number
	private miss: number
	private cache: LRUCacheObject

	constructor(private capacity: number) {
		this.list = new DoubleLinkedListLRU()
		this.capacity = capacity
		this.numKeys = 0
		this.hits = 0
		this.miss = 0
		this.cache = {}
	}

	get numHits() {
		return this.hits
	}

	get numMiss() {
		return this.miss
	}

	get size() {
		return this.numKeys
	}

	/** Return the details for the cache instance [hits, misses, capacity, current_size] */
	cacheInfo() {
		return `CacheInfo(hits=${this.hits}, misses=${this.miss}, capacity=${this.capacity}, current size=${this.numKeys})`
	}

	/** Sets the value for the input key and updates the Double Linked List */
	set<
		K extends NonNullKeyDBLLRU = NonNullKeyDBLLRU,
		V extends NonNullValDBLLRU = NonNullValDBLLRU
	>(key: K, value: V) {
		if (!(key in this.cache)) {
			if (this.numKeys >= this.capacity) {
				const keyToDelete = this.list.head.next?.key

				if (keyToDelete !== null && keyToDelete !== undefined) {
					this.list.remove(this.cache[keyToDelete])
					delete this.cache[keyToDelete]
					this.numKeys -= 1
				}
			}

			this.cache[key] = new DoubleLinkedListLRUNode(key, value)
			this.list.add(this.cache[key])
			this.numKeys += 1
		} else {
			const node = this.list.remove(this.cache[key])
			node.val = value
			this.list.add(node)
		}
	}

	/**
	 * Returns the value for the input key and updates the Double Linked List.
	 * Returns null if key is not present in cache
	 */
	get<K extends NonNullKeyDBLLRU = NonNullKeyDBLLRU>(key: K) {
		if (key in this.cache) {
			this.hits += 1
			this.list.add(this.list.remove(this.cache[key]))

			return this.cache[key].val
		}

		this.miss += 1
		return null
	}
}

export function isLRUCache<T extends LRUCache, U>(data: T | U): data is T {
	return typeof data !== 'undefined' && data instanceof LRUCache
}
