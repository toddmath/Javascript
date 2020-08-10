export class LinkedList {
	private length: number
	private head: Node | null

	constructor() {
		// Length of linklist and head is null at start
		this.length = 0
		this.head = null
	}

	get size() {
		return this.length
	}

	// Creates a node and adds it to linklist
	add<T extends unknown>(element: T) {
		const node = new Node<T>(element)
		// Check if its the first element
		if (this.head === null) {
			this.head = node
		} else {
			let currentNode = this.head

			// Loop till there is node present in the list
			while (currentNode.next) {
				currentNode = currentNode.next
			}

			// Adding node to the end of the list
			currentNode.next = node
		}
		// Increment the length
		this.length++
	}

	// Removes the node with the value as param
	remove(element: unknown) {
		let currentNode = this.head
		let previousNode: Node

		// Check if the head node is the element to remove
		if (currentNode && currentNode.element === element) {
			this.head = currentNode.next
		} else {
			// Check which node is the node to remove
			while (currentNode && currentNode.element !== element) {
				previousNode = currentNode
				currentNode = currentNode.next
			}

			// Removing the currentNode
			previousNode!.next = currentNode!.next
		}

		// Decrementing the length
		this.length--
	}

	// Return if the list is empty
	isEmpty() {
		return this.length === 0
	}

	// Returns the index of the element passed as param otherwise -1
	indexOf<T extends unknown>(element: T) {
		let currentNode = this.head
		let index = -1

		while (currentNode) {
			index++

			// Checking if the node is the element we are searching for
			if (currentNode.element === element) {
				return index + 1
			}
			currentNode = currentNode.next
		}

		return -1
	}

	// Returns the element at an index
	elementAt(index: number) {
		if (!this.head) return null
		let currentNode = this.head
		let count = 0

		while (count < index) {
			count++
			currentNode = currentNode.next!
		}

		return currentNode.element
	}

	// Adds the element at specified index
	addAt<T extends unknown>(index: number, element: T) {
		if (!this.head) return false
		index--
		const node = new Node<T>(element)

		let currentNode = this.head
		let previousNode: Node
		let currentIndex = 0

		// Check if index is out of bounds of list
		if (index > this.length) {
			return false
		}

		// Check if index is the start of list
		if (index === 0) {
			node.next = currentNode
			this.head = node
		} else {
			while (currentIndex < index) {
				currentIndex++
				previousNode = currentNode
				currentNode = currentNode.next!
			}

			// Adding the node at specified index
			node.next = currentNode
			previousNode!.next = node
		}

		// Incrementing the length
		this.length++
		return true
	}

	// Removes the node at specified index
	removeAt(index: number) {
		if (this.head === null) return null
		index--
		let currentNode = this.head
		let previousNode: Node
		let currentIndex = 0

		// Check if index is present in list
		if (index < 0 || index >= this.length) {
			return null
		}

		// Check if element is the first element
		if (index === 0) {
			this.head = currentNode.next
		} else {
			while (currentIndex < index) {
				currentIndex++
				previousNode = currentNode
				currentNode = currentNode.next!
			}

			previousNode!.next = currentNode.next
		}

		// Decrementing the length
		this.length--
		return currentNode.element
	}

	// Function to view the LinkedList
	view() {
		if (this.head === null) return null
		let currentNode = this.head
		let count = 0
		while (count < this.length) {
			count++
			console.log(currentNode.element)
			currentNode = currentNode.next!
		}
	}
}

// class node (constructor)
// Creating Node with element's value
class Node<T = unknown> {
	next: Node | null

	constructor(public element: T) {
		// this.element = element
		this.next = null
	}
}

// Returns the head
// LinkedList.prototype.head = function () {
// 	return this.head
// }

// returns the constructor
// return LinkedList
// })()

// Implementation of LinkedList
// const linklist = new LinkedList()
// linklist.add(2)
// linklist.add(5)
// linklist.add(8)
// linklist.add(12)
// linklist.add(17)
// console.log(linklist.size())
// console.log(linklist.removeAt(4))
// linklist.addAt(4, 15)
// console.log(linklist.indexOf(8))
// console.log(linklist.size())
// linklist.view()
