/**
 * A stack is exactly what it sounds like. An element gets added to the top of
 * the stack and only the element on the top may be removed. This is an example
 * of an array implementation of a Stack. So an element can only be added/removed
 * from the end of the array.
 */
export class Stack<T extends unknown = any> {
	private top: number = 0
	private stack: Array<T> = []

	/**
	 * Adds value onto the end of the stack
	 * @returns {number} The new length of the stack, like `Array.prototype.push`
	 */
	push(value: T): number {
		this.stack[this.top] = value
		this.top++

		return this.size
	}

	/** Removes and returns the value at the end of the stack */
	pop() {
		if (this.top === 0) return null
		this.top--
		let result = this.stack[this.top]
		this.stack = this.stack.splice(0, this.top)

		return result
	}

	/** Returns the size of the stack */
	get size() {
		return this.top
	}

	/** Returns the value at the end of the stack */
	peek() {
		return this.stack[this.top - 1]
	}

	/** To see all the elements in the stack */
	view() {
		this.stack.forEach((i) => console.log(i))
	}
}

// TODO: implement test file for this:
// let myStack = new Stack()

// myStack.push(1)
// myStack.push(5)
// myStack.push(76)
// myStack.push(69)
// myStack.push(32)
// myStack.push(54)
// console.log(myStack.size)
// console.log(myStack.peek())
// console.log(myStack.pop())
// console.log(myStack.peek())
// console.log(myStack.pop())
// console.log(myStack.peek())
// myStack.push(55)
// console.log(myStack.peek())
// myStack.view()
