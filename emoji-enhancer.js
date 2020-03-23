const allEmoji = require('emojilib').lib

const SYMBOLS = '!"#$%&\'()*+,-./:;<=>?@[]^_`{|}~'

/**
 * Returns true for something that's already an emoji like 🤖.
 *
 * @param {String} word The word to be enhanced
 * @returns {Bool}
 */
function isEmoji (word) {
  const ranges = [
    '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
    '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
    '\ud83d[\ude80-\udeff]' // U+1F680 to U+1F6FF
  ]
  return word.match(ranges.join('|')) !== null
}

/**
 * Returns the list of all emoji translations of an english word.
 *
 * @param {String} word The word to be enhanced
 * @returns {Array} The list of emoji translations or '' if none exist.
 */
function getAllEmojiForWord (originalWord) {
  const word = originalWord.trim().toLowerCase()
  const ignoredWords = [
    '', 'a', 'it', 'is'
  ]

  if (!word || ignoredWords.includes(word)) {
    return ''
  }

  // Maybe this is a plural word but the word is the singular?
  // Don't do it for two letter words since "as" would become "a" etc.
  let maybeSingular = ''
  if (word.length > 2 && word.endsWith('s')) {
    maybeSingular = word.slice(0, word.length - 1)
  }

  // Maybe this is a singular word but the word is the plural?
  // Don't do this for single letter since that will pluralize crazy things.
  const maybePlural = (word.length === 1) ? '' : word + 's'

  let maybeVerbedSimple = ''
  let maybeVerbedVowel = ''
  let maybeVerbedDoubled = ''

  if (word.endsWith('ing')) {
    const verb = word.substr(0, word.length - 3)
    // eating -> eat
    maybeVerbedSimple = verb
    // dancing -> dance
    maybeVerbedVowel = verb + 'e'
    // running -> run
    maybeVerbedDoubled = verb.substr(0, verb.length - 1)
  }

  // Go through all the things and find the first one that matches.
  const matchingEmojis = []

  // If this is already an emoji, don't try to enhance it.
  if (isEmoji(word)) {
    matchingEmojis.push(word)
    return matchingEmojis
  }

  for (const emoji in allEmoji) {
    const keywords = allEmoji[emoji].keywords || []
    const variations = [
      word, word + '_face', maybeSingular, maybePlural, maybeVerbedSimple,
      maybeVerbedVowel, maybeVerbedDoubled
    ]

    if (word === allEmoji[emoji].char ||
        variations.includes(emoji) ||
        variations.filter(v => keywords.includes(v)).length > 0) {
      // If it's a two letter word that got translated to a flag, it's 99% of the
      // time incorrect, so stop doing that.
      const isFlag = word.length <= 3 && allEmoji[emoji].category === 'flags'
      if (!isFlag) {
        matchingEmojis.push(allEmoji[emoji].char)
      }
    }
  }
  return matchingEmojis
}

/**
 * Translates an entire sentence to emoji.
 * If multiple translations exist for a particular word, a random emoji is picked.
 *
 * @param {String} sentence The sentence to be enhanced
 * @returns {String} An emoji translation!
 */
function enhance (sentence) {
  return sentence.split(' ')
    .map(word => {
      // Punctuation blows. Get all the punctuation at the start and end of the word.
      let prefix = ''
      let suffix = ''

      while (SYMBOLS.includes(word[0])) {
        prefix += word[0]
        word = word.slice(1, word.length)
      }
      while (SYMBOLS.includes(word[word.length - 1])) {
        suffix += word[word.length - 1]
        word = word.slice(0, word.length - 1)
      }
      const emoji = getAllEmojiForWord(word)[0]
      if (emoji) {
        return `${prefix}${word} ${emoji}${suffix}`
      } else {
        return `${prefix}${word}${suffix}`
      }
    })
    .join(' ')
}

module.exports.isEmoji = isEmoji
module.exports.getAllEmojiForWord = getAllEmojiForWord
module.exports.enhance = enhance
