// Alphabet
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const { length: alphabetLength } = ALPHABET;

// Get correct char
interface IGetCorrectChar {
  (originalChar: string, newChar: string): string;
}
const getCorrectChar: IGetCorrectChar = (originalChar, newChar) => {
  let correctChar = newChar;
  const isUpperCase = originalChar === originalChar.toUpperCase();

  if (!isUpperCase) {
    correctChar = newChar.toLowerCase();
  }
  return correctChar;
};

// Encrypt Caesar
interface IEcryptCesar {
  (message: string, shift: number, encrypt?: boolean): string;
}
const encryptCaesar: IEcryptCesar = (message, shiftNumber, encrypt = true) => {
  const { length: messageLength } = message;

  let encryptedMessage = "";

  for (let i = 0; i < messageLength; i++) {
    // Char
    const char = message[i];
    const upperCasedChar = char.toUpperCase();
    const indexChar = ALPHABET.indexOf(upperCasedChar);

    // Continue non-alphabetic characters unchanged
    if (indexChar === -1) {
      encryptedMessage += char;
      continue;
    }

    // Shift
    const shift = encrypt ? shiftNumber : -shiftNumber;

    // New index
    let newIndex = (indexChar + shift) % alphabetLength;
    if (newIndex < 0) {
      newIndex += alphabetLength;
    }

    // Encrypted char
    let encryptedChar = ALPHABET[newIndex];
    encryptedChar = getCorrectChar(char, encryptedChar);

    // Encrypted message
    encryptedMessage += encryptedChar;
  }
  return encryptedMessage;
};

// Example usage

const message =
  "When I die, bury me Me on the grave Among the wide steppe In a sweet land";
const shift = 22;

const encryptedMessage = encryptCaesar(message, shift);
console.log("Encrypted message:", encryptedMessage);
const decryptedMessage = encryptCaesar(encryptedMessage, shift, false);
console.log("Decrypted message:", decryptedMessage);
