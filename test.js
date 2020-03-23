const test = require('tape')
const path = require('path')
const lib = require(path.join(__dirname, '/emoji-enhancer.js'))

test('isEmoji', function (t) {
  t.equal(lib.isEmoji('batman'), false, 'batman is not an emoji')
  t.equal(lib.isEmoji('🐳'), true, '🐳 is an emoji')
  t.equal(lib.isEmoji('🤞🏿'), true, '🤞🏿 is an emoji')
  t.equal(lib.isEmoji('👩🏽‍🏫'), true, '👩🏽‍🏫 is an emoji')
  t.end()
})

test('getAllEmojiForWord', function (t) {
  t.equal(lib.getAllEmojiForWord('👀')[0], '👀', '👀 is translated to 👀')
  const allCats = lib.getAllEmojiForWord('cat')
  t.equal(allCats.length > 2, true, 'cat is translated to many things')
  t.equal(allCats.indexOf('🐱') !== -1, true, 'cat is translated to 🐱')
  t.equal(allCats.indexOf('🙀') !== -1, true, 'cat is translated to 🙀')
  t.equal(allCats.indexOf('👻') === -1, true, 'cat is not translated to 👻')
  t.end()
})

test('translate', function (t) {
  const sentence = 'the house is on fire and the cat is eating the cake'
  const translated = lib.enhance(sentence)
  t.equal(
    translated,
    'the house 🏘 is on 🔛 fire 🔥 and the cat 😺 is eating 🍽 the cake 🍰',
    'sentence can be translated to something with words')
  t.end()
})

test('punctuation', function (t) {
  // Exclamation marks should be preserved
  t.equal(2, lib.enhance('YES! victory!').match(/!/g).length)
  t.end()
})

test('flags', function (t) {
  // these should not be flags.
  t.equal('im', lib.enhance('im').trim())
  t.equal('in', lib.enhance('in').trim())

  // YES should not have a flag.
  t.equal(-1, lib.getAllEmojiForWord('yes').indexOf('🇾🇪'))
  t.end()
})

test('ing verbs', function (t) {
  // English sucks. Dance+ing = dancing, run+ing = running, eat+ing = eating;
  t.notEqual('saving', lib.enhance('saving').trim())
  t.notEqual('running', lib.enhance('running').trim())
  t.notEqual('eating', lib.enhance('eating').trim())
  t.end()
})

test('omg what is real', function (t) {
  t.notEqual('hi', lib.enhance('hi').trim())
  t.notEqual('', lib.enhance('welcome back, emoji robot! ready to take over the world?', true))
  t.end()
})
