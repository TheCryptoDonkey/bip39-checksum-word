import bip39 from "bip39";

/**
 * Finds the checksum word to complete a BIP39 mnemonic seed phrase.
 *
 * @param {string} words - The partial seed phrase (11 or 23 words).
 * @returns {string} - The complete seed phrase with the checksum word.
 */
function getChecksum(words) {
    // Iterate through the BIP39 English wordlist to find the checksum word
    for (const word of bip39.wordlists.english) {
        // Construct a potential mnemonic with the current word as the checksum word
        const mnemonic = `${words} ${word}`;

        // Validate the constructed mnemonic
        if (bip39.validateMnemonic(mnemonic)) {
            return mnemonic;
        }
    }
}

/**
 * Validates the word count of a partial seed phrase.
 *
 * @param {string} words - The partial seed phrase.
 */
function checkWordCount(words) {
    const wordCount = words.split(' ').length;
    if (wordCount !== 11 && wordCount !== 23) {
        console.error('Error: Seed phrase must contain exactly 11 or 23 words.');
        process.exit(1);
    }
}

// Ensure a partial seed phrase was provided as a command-line argument
if (process.argv.length < 3) {
    console.error('Usage: node index.js <partial-seed-phrase>');
    process.exit(1);
}

// Get the partial seed phrase from the command-line arguments
const partialSeed = process.argv[2];

// Validate the word count of the partial seed phrase
checkWordCount(partialSeed);

// Get the complete seed phrase by finding the checksum word
const seedPhrase = getChecksum(partialSeed);

console.log('Valid BIP39 Seed:', seedPhrase);
