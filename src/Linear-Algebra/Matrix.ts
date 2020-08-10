/**
 *	@class Matrix
 *	This class represents a matrix of arbitrary size and operations on it.
 */
export class Matrix {
	public matrix: number[][]
	public rows: number
	public cols: number

	constructor(
		public row: number,
		public col: number,
		public comps: number[][] = []
	) {
		if (comps.length === 0) {
			this.matrix = Array.from({ length: row }, () =>
				Array.from({ length: col }, () => 0)
			)
		} else {
			this.matrix = comps
		}

		this.rows = row
		this.cols = col
	}

	component(x: number, y: number) {
		if (x >= 0 && x < this.rows && y >= 0 && y < this.cols) {
			return this.matrix[x][y]
		} else {
			throw new Error('component: index out of bounds')
		}
	}

	// changes the specified component with value 'value'.
	changeComponent(x: number, y: number, value: number) {
		if (x >= 0 && x < this.rows && y >= 0 && y < this.cols) {
			this.matrix[x][y] = value
		} else {
			throw new Error('changeComponent: index out of bounds')
		}
	}

	// returns a string representation of this matrix.
	toString(): string {
		let str = ''
		this.matrix.forEach((row, i) => {
			str += '|'
			row.forEach((col, j) => {
				if (j < this.cols - 1) str += `${col},`
				else {
					if (i < this.rows - 1) str += `${col}|` + '\n'
					else str += `${col}|`
				}
			})
		})
		return str
	}

	/** @returns {[number, number]} the dimension rows x cols as number array */
	get dimension(): [number, number] {
		return [this.rows, this.cols]
	}

	/** `Matrix` addition. returns the result. */
	add(other: Matrix): Matrix {
		const [otherRow, otherCol] = other.dimension

		if (this.rows === otherRow && this.cols === otherCol) {
			this.matrix = this.matrix.map((row, i) =>
				row.map((col, j) => col + other.component(i, j))
			)

			return this
		} else {
			throw new Error('add: matrices must have same dimension!')
		}
	}

	/** @returns {boolean} true if the matrices are equal, otherwise false. */
	equal(other: Matrix): boolean {
		const [otherRows, otherCols] = other.dimension
		let isEqual = true
		const EPSILON = 0.001

		if (this.rows === otherRows && this.cols === otherCols) {
			this.matrix.forEach((row, i) => {
				row.forEach((col, j) => {
					if (Math.abs(col - other.component(i, j)) > EPSILON) {
						isEqual = true
					}
				})
			})
		} else {
			isEqual = false
		}
		return isEqual
	}
	/** matrix-scalar multiplication */
	scalar(c: number) {
		const matrix = new Matrix(this.rows, this.cols)

		this.matrix.forEach((row, i) => {
			row.forEach((col, j) => {
				matrix.changeComponent(i, j, col * c)
			})
		})

		return matrix
	}
}
