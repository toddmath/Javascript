/**
 * @module XOR
 * The XOR cipher is a type of additive cipher.
 * Each character is bitwise XORed with the key.
 * We loop through the input string, XORing each
 * character with the key.
 */

/** utility function */
const fromCharCode = String.fromCharCode
const getChar = (s: string) => s.charCodeAt(0)

const strArray = (s: string): string[] => s.split('')

export type CXOR = (str: string, key: number) => string

/**
 * Encrypt using an XOR cipher
 * @param {string} str - String to be encrypted
 * @param {number} key - encryption key
 * @return {string} encrypted string
 */
export const XOR: CXOR = (str, key) => {
	return strArray(str).reduce(
		(acc, char) => (acc += fromCharCode(getChar(char) ^ key)),
		''
	)
}

const encryptedString = XOR('test string', 32)
console.log('Encrypted: ', encryptedString)
const decryptedString = XOR(encryptedString, 32)
console.log('Decrypted: ', decryptedString)
