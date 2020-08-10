export class Queue<T extends unknown = any> {
	private inputStack: T[] = []
	private outputStack: T[] = []

	/** Push item into the inputstack */
	enqueue(item: T) {
		this.inputStack.push(item)
	}

	dequeue() {
		this.outputStack = []
		if (this.inputStack.length > 0) {
			while (this.inputStack.length > 0) {
				this.outputStack.push(this.inputStack.pop()!)
			}
		}

		if (this.outputStack.length > 0) {
			// console.log(this.outputStack.pop())
			this.inputStack = []
			while (this.outputStack.length > 0) {
				this.inputStack.push(this.outputStack.pop()!)
			}
		}
	}

	/** display elements of the inputstack */
	listIn() {
		let i = 0
		while (i < this.inputStack.length) {
			console.log(this.inputStack[i])
			i++
		}
	}

	/** display element of the outputstack */
	listOut() {
		let i = 0
		while (i < this.outputStack.length) {
			console.log(this.outputStack[i])
			i++
		}
	}
}

// TODO: implement test file for this:
// const queue = new Queue<number>()
// queue.enqueue(1)
// queue.enqueue(2)
// queue.enqueue(8)
// queue.enqueue(9)

// console.log(queue.dequeue())
// // ans = 1
// console.log(queue.dequeue())
// // ans = 2
