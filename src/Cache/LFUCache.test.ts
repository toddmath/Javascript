import { LFUCache, isLFUCache } from './LFUCache'

describe('LFUCache', () => {
	test('should create new instance with length of given capacity', () => {
		const cache = new LFUCache(10)
		expect(cache.cacheInfo()).toMatch(/capacity=10/)
	})

	test('should get and set values within capacity and miss otherwise', () => {
		const cache = new LFUCache(2)

		cache.set(1, 1)
		cache.set(2, 2)
		expect(cache.get(1)).toBe(1)

		cache.set(3, 3)
		expect(cache.get(2)).toBeNull()

		cache.set(4, 4)
		expect(cache.get(1)).toBeNull()
		expect(cache.get(3)).toBe(3)
		expect(cache.get(4)).toBe(4)
	})

	test('should cache recursive fibonacci function', () => {
		function fib(num: number, cache: LFUCache | null = null): number {
			if (isLFUCache(cache)) {
				const value = cache.get(num)
				if (value && typeof value === 'number') {
					return value
				}
			}

			if (num === 1 || num === 2) {
				return 1
			}

			const result = fib(num - 1, cache) + fib(num - 2, cache)

			if (cache instanceof LFUCache) {
				cache.set(num, result)
			}

			return result
		}

		const fibCache = new LFUCache(100)

		for (let i = 1; i <= 100; i++) {
			fib(i, fibCache)
		}

		expect(fibCache.cacheInfo()).toMatch(/capacity=100/)
		expect(fibCache.size).toBe(98)
	})
})
