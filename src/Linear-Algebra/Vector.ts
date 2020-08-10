function createArray(length: number): number[] {
	return Array.from({ length }, () => 0)
}

export class Vector {
	constructor(public n: number, public components: number[] = []) {
		if (components.length === 0) {
			this.components = Array.from({ length: n }, () => 0.0)
		} else {
			if (n === components.length) {
				this.components = components
			} else {
				throw new Error('Vector: invalid size')
			}
		}
	}

	/**
	 * @returns {number} the size of the vector, *not the eulidean length!*
	 */
	get size(): number {
		return this.components.length
	}

	eulideanLength() {
		if (this.components) {
			const total = this.components.reduce((sum, val) => {
				sum += val
				return sum
			}, 0.0)
			return Math.sqrt(total)
		}

		return 0
	}

	component(index: number) {
		return this.components[index]
	}

	changeComponent(index: number, value: number) {
		if (index >= 0 && index < this.components.length) {
			this.components[index] = value
		} else {
			throw new Error('changeComponent: index out of bounds')
		}
	}

	/** Add two `Vector` */
	add(other: Vector) {
		if (this.size === other.size) {
			this.components = this.components.map((num, i) => {
				num += other.component(i)
				return num
			})

			return this
		} else {
			throw new Error(
				'add: vector must have the same size and not be undefined'
			)
		}
	}

	sub(other: Vector) {
		if (this.size === other.size) {
			this.components = this.components.map((num, i) => {
				num -= other.component(i)
				return num
			})

			return this
		} else {
			throw new Error('sub: vector must have same size and not be undefined')
		}
	}

	/** dot product */
	dot(other: Vector) {
		if (other.size === this.size) {
			const sum = this.components.reduce((acc, num, i) => {
				acc += num * other.component(i)
				return acc
			}, 0)

			return sum
		} else {
			throw new Error('dot: vector must have same size and not be undefined')
		}
	}

	scalar(s: number) {
		const sclr = new Vector(this.size)

		this.components.forEach((num, i) => {
			sclr.changeComponent(i, num * s)
		})

		return sclr
	}

	toString() {
		const str: string = this.components.reduce((acc, num, i) => {
			if (i < this.size - 1) acc += `${num},`
			else acc += `${num})`
			return acc
		}, '(')

		return str
	}

	/**
	 * converts this vector in a unit basis vector and returns it.
	 * the One is on position 'pos'
	 */
	createUnitBasis(pos: number) {
		if (pos >= 0 && pos < this.components.length) {
			this.components = this.components.map((val, i) => {
				if (i === pos) val = 1.0
				else val = 0.0
				return val
			})
		} else {
			throw new Error('createUnitBasis: index out of bounds')
		}

		return this
	}

	/** Normalizes this `Vector` and returs it */
	norm() {
		const quotient = 1.0 / this.eulideanLength()
		this.components = this.components.map((val) => (val *= quotient))
		return this
	}

	equal(other: Vector) {
		let ans = true
		const _size = this.size || 0
		const EPSILON = 0.001

		if (_size === other.size) {
			for (let i = 0; i < _size; i++) {
				if (Math.abs(this.components[i] - other.component(i)) > EPSILON) {
					ans = false
				}
			}
		} else {
			ans = false
		}

		return ans
	}
}

// returns a unit basis vector of size N with a One on position 'pos'
export function unitBasisVector(n: number, pos: number) {
	const vec = new Vector(n)
	let i = 0
	while (i < n) {
		if (i === pos) vec.changeComponent(i, 1.0)
		else vec.changeComponent(i, 0)
		i++
	}
	return vec
}

// returns a random vector with integer components (between 'a' and 'b') of size N.
export function randomVectorInt(n: number, a: number, b: number) {
	const vec = new Vector(n)
	let i = 0
	while (i < n) {
		vec.changeComponent(i, Math.floor(Math.random() * b + a))
		i++
	}
	return vec
}

// returns a random vector with floating point components (between 'a' and 'b') of size N.
export function randomVectorFloat(n: number, a: number, b: number) {
	const vec = new Vector(n)
	let i = 0
	while (i < n) {
		vec.changeComponent(i, Math.random() * b + a)
	}
	return vec
}
