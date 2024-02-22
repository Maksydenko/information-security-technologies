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

// Encrypt XOR
interface IEncryptXOR {
  (message: string, gamma: string, encrypt?: boolean): string;
}
const encryptXOR: IEncryptXOR = (message, gamma, encrypt = true) => {
  const { length: messageLength } = message;
  const { length: gammaLength } = gamma;

  let encryptedMessage = "";

  for (let i = 0; i < messageLength; i++) {
    // Message char
    const messageChar = message[i];
    const upperCasedMessageChar = messageChar.toUpperCase();
    const messageCharIndex = ALPHABET.indexOf(upperCasedMessageChar);

    // Continue non-alphabetic characters unchanged
    if (messageCharIndex === -1) {
      encryptedMessage += messageChar;
      continue;
    }

    // Gamma char
    const gammaIndex = i % gammaLength;
    const gammaChar = gamma[gammaIndex];
    const upperCasedGammaChar = gammaChar.toUpperCase();

    // Gamma shift
    let gammaShift = ALPHABET.indexOf(upperCasedGammaChar);
    gammaShift = encrypt ? gammaShift : -gammaShift;

    // New index
    let newIndex = (messageCharIndex + gammaShift) % alphabetLength;
    if (newIndex < 0) {
      newIndex += alphabetLength;
    }

    // Encrypted char
    let encryptedChar = ALPHABET[newIndex];
    encryptedChar = getCorrectChar(messageChar, encryptedChar);

    // Encrypted message
    encryptedMessage += encryptedChar;
  }
  return encryptedMessage;
};

// Example usage

const message =
  "When I die, bury me Me on the grave Among the wide steppe In a sweet land";
const gamma = "DavydenkoMaksym2202";

const encryptedMessage = encryptXOR(message, gamma);
console.log("Encrypted message:", encryptedMessage);
const decryptedMessage = encryptXOR(encryptedMessage, gamma, false);
console.log("Decrypted message:", decryptedMessage);
