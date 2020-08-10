import { DoubleLinkedList } from './DoublyLinkedList'

function createDLL() {
	return new DoubleLinkedList()
}

describe('DoublyLinkedList', () => {
	test('should be instance of DoubleLinkedList', () => {
		const dll = createDLL()
		expect(dll).toBeInstanceOf(DoubleLinkedList)
	})

	test('should append values and print the right length', () => {
		const dll = createDLL()
		dll.append(1)
		dll.append(2)
		expect(dll.size).toEqual(2) // returns 2
	})

	test('should return correct indexOf values', () => {
		const dll = createDLL()
		dll.append(0)
		dll.append(1)
		dll.append(2)
		dll.append(3)
		expect(dll.indexOf(0)).toBe(0)
		expect(dll.indexOf(3)).toBe(3)
		expect(dll.toArray()).toBeArrayOfSize(4)
	})

	test('should insert and remove values in the correct positions', () => {
		const dll = createDLL()
		const vals = [0, 1, 2, 3, 4, 5]
		vals.forEach((val) => dll.append(val))
		expect(dll.toArray()).toStrictEqual(vals)

		dll.insert(0, 4)
		expect(dll.toArray()).toStrictEqual([4, 0, 1, 2, 3, 4, 5])

		dll.removeAt(0)
		expect(dll.toArray()).toStrictEqual(vals)

		dll.removeAt(dll.size - 1)
		expect(dll.toArray()).toStrictEqual([0, 1, 2, 3, 4])

		dll.removeAt(2)
		expect(dll.toArray()).toStrictEqual([0, 1, 3, 4])
	})
})
