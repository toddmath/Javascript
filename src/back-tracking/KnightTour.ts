// Wikipedia: https://en.wikipedia.org/wiki/Knight%27s_tour

export class OpenKnightTour {
	board: Array<Array<number>>
	size: number

	constructor(size: number) {
		this.board = Array.from({ length: size }, () =>
			Array.from({ length: size }, () => 0)
		)
		this.size = size
	}

	getMoves([i, j]: [number, number]) {
		// helper function to get the valid moves of the knight from the current position
		const moves = [
			[i + 2, j - 1],
			[i + 2, j + 1],
			[i - 2, j - 1],
			[i - 2, j + 1],
			[i + 1, j - 2],
			[i + 1, j + 2],
			[i - 1, j - 2],
			[i - 1, j + 2],
		]

		return moves.filter(
			([y, x]) => y >= 0 && y < this.size && x >= 0 && x < this.size
		)
	}

	isComplete() {
		// helper function to check if the board is complete
		return !this.board.map((row) => row.includes(0)).includes(true)
	}

	solve() {
		// function to find the solution for the given board
		return this.board.some((row, i) =>
			row.some((_, j) => this.solveHelper([i, j], 0))
		)

		// for (let i = 0; i < this.size; i++) {
		// 	for (let j = 0; j < this.size; j++) {
		// 		if (this.solveHelper([i, j], 0)) return true
		// 	}
		// }
		// return false
	}

	solveHelper([i, j]: [number, number], curr: number) {
		// helper function for the main computation
		if (this.isComplete()) return true

		for (const [y, x] of this.getMoves([i, j])) {
			if (this.board[y][x] === 0) {
				this.board[y][x] = curr + 1
				if (this.solveHelper([y, x], curr + 1)) return true
				// backtracking
				this.board[y][x] = 0
			}
		}
		return false
	}

	/** utility function to display the board */
	printBoard(): string {
		const str: string = this.board.reduce((acc, row) => {
			acc += row.reduce((racc, elem) => (racc += elem + '\t'), '') + '\n'
			return acc
		}, '')

		return str

		// for (const row of this.board) {
		// 	let string = ''
		// 	for (const elem of row) {
		// 		string += elem + '\t'
		// 	}
		// 	console.log(string)
		// }
	}
}

// TODO: implememnt test file:
// function main() {
// 	const board = new OpenKnightTour(5)

// 	board.printBoard()
// 	console.log('\n')

// 	board.solve()

// 	board.printBoard()
// }

// main()
