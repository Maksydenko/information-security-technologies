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

// Encrypt Vigenere
interface IEncryptVigenere {
  (message: string, keyword: string, encrypt?: boolean): string;
}
const encryptVigenere: IEncryptVigenere = (
  message,
  keyword,
  encrypt = true
) => {
  const { length: messageLength } = message;
  const { length: keywordLength } = keyword;

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

    // Keyword char
    const keywordChar = keyword[i % keywordLength];
    const upperCasedKeywordChar = keywordChar.toUpperCase();
    const keywordCharIndex = ALPHABET.indexOf(upperCasedKeywordChar);

    // Shift
    const shift = encrypt ? keywordCharIndex : -keywordCharIndex;

    // New index
    let newIndex = (messageCharIndex + shift) % alphabetLength;
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
const keyword = "Davydenko";

const encryptedMessage = encryptVigenere(message, keyword);
console.log("Encrypted message:", encryptedMessage);
const decryptedMessage = encryptVigenere(encryptedMessage, keyword, false);
console.log("Decrypted message:", decryptedMessage);
