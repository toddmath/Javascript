class Node<T extends unknown> {
	value: T
	left: Node<T> | null = null
	right: Node<T> | null = null

	constructor(value: T) {
		this.value = value
	}

	// Search the tree for a value
	search(val: T): Node<T> | null {
		if (this.value === val) {
			return this
		} else if (val < this.value && this.left != null) {
			return this.left.search(val)
		} else if (val > this.value && this.right != null) {
			return this.right.search(val)
		}
		return null
	}

	// Visit a node
	visit(): void {
		if (this.left != null) {
			this.left.visit()
		}

		// console.log(this.value)
		if (this.right != null) {
			this.right.visit()
		}
	}

	// Add a node
	addNode(n: Node<T>) {
		if (n.value < this.value) {
			if (this.left == null) {
				this.left = n
			} else {
				this.left.addNode(n)
			}
		} else if (n.value > this.value) {
			if (this.right == null) {
				this.right = n
			} else {
				this.right.addNode(n)
			}
		}
	}
}

export class Tree<T extends unknown> {
	root: Node<T> | null = null

	// Inorder traversal
	traverse() {
		if (this.root) this.root.visit()
	}

	// Start by searching the root
	search(val: T) {
		if (!this.root) return null
		const found = this.root.search(val)

		if (found === null) {
			return null
			// console.log(val + ' not found')
		} else {
			return found.value
			// console.log('Found:' + found.value)
		}
	}

	// Add a new value to the tree
	addValue(val: T) {
		const n = new Node<T>(val)

		if (this.root == null) {
			this.root = n
		} else {
			this.root.addNode(n)
		}
	}
}

// TODO: implement test file:
// var bst = new Tree()
// bst.addValue(6)
// bst.addValue(3)
// bst.addValue(9)
// bst.addValue(2)
// bst.addValue(8)
// bst.addValue(4)
// bst.traverse()
// bst.search(8)
