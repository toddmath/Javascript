/**
 * Check if the Character is letter or not
 * @param {String} str - character to check
 * @return {object} An array with the character or null if isn't a letter
 */
function isLetter(str: string): RegExpMatchArray | null {
	if (str.length === 1) {
		return str.match(/[a-zA-Z]/i)
	}

	return null
	// return str.length === 1 && str.match(/[a-zA-Z]/i)
}

/**
 * Check if is Uppercase or Lowercase
 * @param {String} character - character to check
 * @return {boolean} result of the checking
 */
function isUpperCase(character: string): boolean | undefined {
	if (character === character.toUpperCase()) {
		return true
	}
	if (character === character.toLowerCase()) {
		return false
	}

	// ? Added this return for ts
	return undefined
}

const fromCharCode = String.fromCharCode
const getChar = (s: string) => s.charCodeAt(0)

function toUpper(str: string): string {
	return str.toUpperCase()
}

function toLower(str: string): string {
	return str.toLowerCase()
}

/**
 * Encrypt a Vigenere cipher
 * @param {String} message - string to be encrypted
 * @param {String} key - key for encrypt
 * @return {String} result - encrypted string
 */
export function encrypt(message: string, key: string): string {
	let result = ''
	const { length } = message

	for (let i = 0, j = 0; i < length; i++) {
		const c = message.charAt(i)

		if (isLetter(c)) {
			if (isUpperCase(c)) {
				result += fromCharCode(
					((getChar(c) + toUpper(key).charCodeAt(j) - 2 * 65) % 26) + 65
				) // A: 65
			} else {
				result += fromCharCode(
					((getChar(c) + toLower(key).charCodeAt(j) - 2 * 97) % 26) + 97
				) // a: 97
			}
		} else {
			result += c
		}

		j = ++j % key.length
	}

	return result
}

/**
 * Decrypt a Vigenere cipher
 * @param {String} message - string to be decrypted
 * @param {String} key - key for decrypt
 * @return {String} result - decrypted string
 */
export function decrypt(message: string, key: string): string {
	let result = ''

	for (let i = 0, j = 0; i < message.length; i++) {
		const c = message.charAt(i)

		if (isLetter(c)) {
			if (isUpperCase(c)) {
				result += String.fromCharCode(
					90 - ((25 - (c.charCodeAt(0) - key.toUpperCase().charCodeAt(j))) % 26)
				)
			} else {
				result += String.fromCharCode(
					122 -
						((25 - (c.charCodeAt(0) - key.toLowerCase().charCodeAt(j))) % 26)
				)
			}
		} else {
			result += c
		}

		j = ++j % key.length
	}

	return result
}

const messageEncrypt = encrypt('Hello World!', 'code')
console.log(messageEncrypt) // "Jhpnr Yrvng!"

const messageDecrypt = decrypt('Jsopq Zstzg!', 'code')
console.log(messageDecrypt) // "Hello World!"
