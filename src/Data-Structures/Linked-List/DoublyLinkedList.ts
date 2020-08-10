class Node<T extends number> {
	element: T | null
	next: Node<T> | null
	prev: Node<T> | null

	constructor(element: T) {
		this.element = element
		this.next = null
		this.prev = null
	}
}

export class DoubleLinkedList<T extends number> {
	private length = 0
	private head: Node<T> | null = null
	private tail: Node<T> | null = null

	/** Add new element to end of list */
	append(element: T) {
		const node = new Node<T>(element)

		if (!this.head) {
			this.head = node
			this.tail = node
		} else {
			node.prev = this.tail
			this.tail!.next = node
			this.tail = node
		}

		this.length++
	}

	/** Add element at any position */
	insert(position: number, element: T) {
		if (!this.head) return null
		// Check of out-of-bound values
		if (position >= 0 && position <= this.length) {
			const node = new Node<T>(element)
			let current = this.head
			let previous: null | Node<T>
			let index = 0

			if (position === 0) {
				if (!this.head) {
					this.head = node
					this.tail = node
				} else {
					node.next = current
					current!.prev = node
					this.head! = node
				}
			} else if (position === this.length) {
				current = this.tail!
				current.next = node
				node.prev = current
				this.tail = node
			} else {
				while (index++ < position) {
					previous = current as Node<T>
					current = current.next!
				}

				node.next = current!.prev!.next = node

				// New
				current!.prev = node
				node.prev = previous! as Node<T>
			}

			this.length++

			return true
		} else return false
	}

	/** Remove element at any position */
	removeAt(position: number) {
		// look for out-of-bounds value
		if (position > -1 && position < this.length) {
			let current = this.head!
			let previous: Node<T> | number = 0
			let index = 0

			// Removing first item
			if (position === 0) {
				this.head = current.next

				// if there is only one item, update tail //NEW
				if (this.length === 1) this.tail = null
				else this.head!.prev = null
			} else if (position === this.length - 1) {
				current = this.tail!
				this.tail = current.prev
				this.tail!.next = null
			} else {
				while (index++ < position) {
					previous = current
					current = current.next!
				}

				// link previous with current's next - skip it
				;(previous as Node<T>).next = current.next
				current.next!.prev = previous as Node<T>
			}

			this.length--

			return current.element
		} else return null
	}

	/** Get the indexOf item */
	indexOf(elm: T) {
		let current = this.head
		let index = -1

		// If element found then return its position
		while (current) {
			if (elm === current.element) {
				return ++index
			}

			index++
			current = current.next
		}

		return -1
	}

	/** Find the item in the list */
	isPresent(elm: T): boolean {
		return this.indexOf(elm) !== -1
	}

	/** Delete an item from the list */
	delete(elm: T): T | null {
		return this.removeAt(this.indexOf(elm))
	}

	/** Delete first item from the list */
	deleteHead(): void {
		this.removeAt(0)
	}

	/** Delete last item from the list */
	deleteTail(): void {
		this.removeAt(this.length - 1)
	}

	/** Print item of the string */
	toString(): string {
		let current = this.head
		let string = ''

		while (current) {
			string += current.element + (current.next ? '\n' : '')
			current = current.next
		}

		return string
	}

	/** Convert list to array */
	toArray(): T[] {
		if (this.head === null) return []
		const arr: T[] = []
		let current = this.head!

		while (current) {
			arr.push(current.element!)
			current = current.next!
		}

		return arr
	}

	/** Check if list is empty */
	get isEmpty() {
		return this.length === 0
	}

	/** Get the size of the list */
	get size() {
		return this.length
	}

	/** Get the head */
	getHead() {
		return this.head
	}

	/** Get the tail */
	getTail() {
		return this.tail
	}
}
