import { decimalToHex } from './DecimalToHex'

describe('decimalToHex()', () => {
	test('gives the correct output', () => {
		expect(decimalToHex(999098)).toStrictEqual('F3EBA')
		expect(decimalToHex(123)).toStrictEqual('7B')
	})
})
