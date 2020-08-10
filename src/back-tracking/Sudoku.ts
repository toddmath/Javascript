export class Sudoku {
	constructor(public board: Array<Array<number>>) {}

	// Find a empty cell in the board (returns [-1, -1] if all cells are filled)
	findEmptyCell() {
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				if (this.board[i][j] === 0) return [i, j]
			}
		}
		return [-1, -1]
	}

	// checks if the value to be added in the board is an acceptable value for the cell
	check([y, x]: [number, number], value: number) {
		// checking through the row
		for (let i = 0; i < 9; i++) {
			if (this.board[i][x] === value) return false
		}

		// checking through the column
		for (let i = 0; i < 9; i++) {
			if (this.board[y][i] === value) return false
		}

		// checking through the 3x3 block of the cell
		const secRow = ~~(y / 3)
		const secCol = ~~(x / 3)
		for (let i = secRow * 3; i < secRow * 3 + 3; i++) {
			for (let j = secCol * 3; j < secCol * 3 + 3; j++) {
				if (y !== i && x !== j && this.board[i][j] === value) return false
			}
		}

		return true
	}

	solve() {
		const [y, x] = this.findEmptyCell()

		// checking if the board is complete
		if (y === -1 && x === -1) return true

		for (let val = 1; val < 10; val++) {
			if (this.check([y, x], val)) {
				this.board[y][x] = val
				if (this.solve()) return true
				// backtracking if the board cannot be solved using current configuration
				this.board[y][x] = 0
			}
		}
		// returning false the board cannot be solved using current configuration
		return false
	}

	getSection(row: number, [start, end]: [number, number]) {
		return this.board[row].slice(start, end)
	}

	// helper function to display board
	printBoard() {
		for (let i = 0; i < 9; i++) {
			if (i % 3 === 0 && i !== 0) console.log('- - - - - - - - - - - -')
			console.log(
				...this.getSection(i, [0, 3]),
				' | ',
				...this.getSection(i, [3, 6]),
				' | ',
				...this.getSection(i, [6, 9])
			)
		}
	}

	getBoard(): string {
		let i = 0,
			str = ''
		while (i < 9) {
			if (i % 3 === 0 && i !== 0) str += '- - - - - - - - - - - -'
			str += `${this.getSection(i, [0, 3]).join('')} | ${this.getSection(i, [
				3,
				6,
			]).join('')} | ${this.getSection(i, [6, 9]).join('')}`
			i++
		}
		return str
	}
}

// TODO: implement test file:
// function main() {
// 	// main function with an example
// 	const sudokuBoard = new Sudoku([
// 		[3, 0, 6, 5, 0, 8, 4, 0, 0],
// 		[5, 2, 0, 0, 0, 0, 0, 0, 0],
// 		[0, 8, 7, 0, 0, 0, 0, 3, 1],
// 		[0, 0, 3, 0, 1, 0, 0, 8, 0],
// 		[9, 0, 0, 8, 6, 3, 0, 0, 5],
// 		[0, 5, 0, 0, 9, 0, 6, 0, 0],
// 		[1, 3, 0, 0, 0, 0, 2, 5, 0],
// 		[0, 0, 0, 0, 0, 0, 0, 7, 4],
// 		[0, 0, 5, 2, 0, 6, 3, 0, 0],
// 	])

// 	sudokuBoard.printBoard()

// 	console.log('\n')
// 	sudokuBoard.solve()

// 	sudokuBoard.printBoard()
// }

// main()
