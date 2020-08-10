export class NQueen {
	board: Array<Array<string>>

	constructor(public size: number) {
		this.board = Array.from({ length: size }, () =>
			Array.from({ length: size }, () => '.')
		)
		// this.size = size
	}

	/** checks if the placement of the queen in the given location is valid */
	isValid([row, col]: [number, number]) {
		// checking the left of the current row
		for (let i = 0; i < col; i++) {
			if (this.board[row][i] === 'Q') return false
		}

		// checking the upper left diagonal
		for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
			if (this.board[i][j] === 'Q') return false
		}

		// checking the lower left diagonal
		for (let i = row, j = col; j >= 0 && i < this.size; i++, j--) {
			if (this.board[i][j] === 'Q') return false
		}

		return true
	}

	solve(col = 0) {
		if (col >= this.size) return true

		for (let i = 0; i < this.size; i++) {
			if (this.isValid([i, col])) {
				this.board[i][col] = 'Q'

				if (this.solve(col + 1)) {
					return true
				}

				// backtracking
				this.board[i][col] = '.'
			}
		}

		return false
	}

	// utility function to display the board
	printBoard() {
		let str = ''
		this.board.forEach((row) => (str += row.join(',') + '\n'))
		return str
		// for (const row of this.board) {
		// 	console.log(...row)
		// }
	}
}

// TODO: implement test file:
// function main() {
// 	const board = new NQueen(8)

// 	board.printBoard()
// 	console.log('\n')

// 	board.solve()

// 	board.printBoard()
// }

// main()
