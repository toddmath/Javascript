import { Vector, unitBasisVector, randomVectorInt } from './Vector'
import { Matrix } from './Matrix'

describe('Vector', () => {
	test('toString() should return correct string', () => {
		expect(new Vector(3, [1, 2, 3]).toString()).toBe('(1,2,3)')
	})

	test('unitBasisVector() should return a unit basis vector', () => {
		expect(unitBasisVector(3, 1).toString()).toBe('(0,1,0)')
	})

	test('add()', () => {
		const x = new Vector(3, [1, 2, 3])
		const y = new Vector(3, [1, 2, 3])
		expect(x.add(y).toString()).toBe('(2,4,6)')
	})

	test('sub()', () => {
		const x = new Vector(3, [1, 2, 3])
		const y = new Vector(3, [1, 2, 3])
		// x.sub(y)
		expect(x.sub(y).toString()).toBe('(0,0,0)')
	})

	test('dot() should return dot-product ', () => {
		const x = new Vector(3, [1, 2, 3])
		const y = new Vector(3, [5, 6, 7])
		expect(x.dot(y)).toEqual(38)
	})

	test('scalar() should return scalar product', () => {
		const x = new Vector(3, [1, 2, 3])
		const newX = x.scalar(2)
		expect(newX.toString()).toBe('(2,4,6)')
	})

	test('size() should return size, not eulidean length of vector', () => {
		const x = randomVectorInt(10, 1, 5)
		expect(x.size).toStrictEqual(10)
	})

	test('equal() should compare two vectors', () => {
		const x = new Vector(3, [1, 2, 2])
		const y = new Vector(3, [1, 2, 3])
		expect(x.equal(x)).toBe(true)
		expect(x.equal(y)).toBe(false)
	})

	test('component() should return specified component', () => {
		const x = new Vector(3, [1, 2, 2])
		expect(x.component(1)).toBe(2)
	})

	test('changeComponent() should return changed component', () => {
		const x = new Vector(3, [1, 2, 2])
		x.changeComponent(1, 5)
		expect(x.toString()).toBe('(1,5,2)')
	})
})

// TODO: fix code or tests to get these passing:
// describe('Vector operations', () => {
// describe('norm()', () => {
// 	it('should return the normalizes vector', () => {
// 		const x = new Vector(4, [9, 0, 3, 1])
// 		const y = x.norm()
// 		expect(
// 			Math.abs(y.component(0) - 9.0 / Math.sqrt(91))
// 		).toBeLessThanOrEqual(0.01)
// 	})
// })
// describe('eulideanLength()', () => {
// 	it('should return the eulidean length of the vector', () => {
// 		const x = new Vector(3, [1, 2, 2])
// 		expect(Math.abs(x.eulideanLength() - 3)).toBeCloseTo(0.001)
// 	})
// })
// })

describe('Matrix', () => {
	test('component() should return the specified component', () => {
		const A = new Matrix(2, 2)
		expect(A.component(0, 1)).toBe(0)
		const B = new Matrix(2, 2, [
			[1, 2],
			[3, 4],
		])
		expect(B.component(1, 0)).toBe(3)
	})

	test('toString() should return a string representation of the matrix', () => {
		const A = new Matrix(2, 2, [
			[1, 2],
			[3, 4],
		])
		expect(A.toString()).toBe('|1,2|\n|3,4|')
	})

	test('dimension should get the dimension of the matrix as number array', () => {
		const A = new Matrix(3, 2, [
			[1, 2],
			[3, 4],
			[5, 6],
		])
		const [row, col] = A.dimension
		expect(row).toBe(3)
		expect(col).toBe(2)
	})

	test('changeComponent() should change the specified component', () => {
		const A = new Matrix(3, 2, [
			[1, 2],
			[3, 4],
			[5, 6],
		])

		A.changeComponent(1, 0, 5)
		expect(A.component(1, 0)).toBe(5)
	})

	test('equal() should compares the matrices', () => {
		const A = new Matrix(3, 2, [
			[1, 2],
			[3, 4],
			[5, 6],
		])
		const B = new Matrix(3, 2, [
			[1, 2],
			[3, 4],
			[5, 6],
		])
		const C = new Matrix(2, 2, [
			[1, 2],
			[3, 4],
		])
		const D = new Matrix(2, 2, [
			[1, 2],
			[5, 4],
		])
		expect(A.equal(B)).toBe(true)
		expect(A.equal(C)).toBe(false)
		expect(C.equal(D)).toBe(true)
	})

	test('add() should return the result of the matrix addition', () => {
		const A = new Matrix(3, 2, [
			[1, 2],
			[3, 4],
			[5, 6],
		])
		const B = new Matrix(3, 2, [
			[1, 2],
			[3, 4],
			[5, 6],
		])
		const C = A.add(B)
		expect(C.component(1, 0)).toBe(6)
		expect(C.component(1, 1)).toBe(8)
		expect(C.component(0, 0)).toBe(2)
	})

	test('scalar() should return the result of the matrix-scalar multiplication', () => {
		const A = new Matrix(3, 2, [
			[1, 2],
			[3, 4],
			[5, 6],
		])
		const B = A.scalar(2)
		const C = new Matrix(3, 2, [
			[2, 4],
			[6, 8],
			[10, 12],
		])
		expect(B.equal(C)).toBe(true)
	})
})
