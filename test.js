const test = require('tape')
const path = require('path')
const translate = require(path.join(__dirname, '/emoji-translate.js'))

test('isEmoji', function (t) {
  t.equal(translate.isEmoji('batman'), false, 'batman is not an emoji')
  t.equal(translate.isEmoji('🐳'), true, '🐳 is an emoji')
  t.equal(translate.isEmoji('🤞🏿'), true, '🤞🏿 is an emoji')
  t.equal(translate.isEmoji('👩🏽‍🏫'), true, '👩🏽‍🏫 is an emoji')
  t.end()
})

test('getAllEmojiForWord', function (t) {
  t.equal(translate.getAllEmojiForWord('👀')[0], '👀', '👀 is translated to 👀')
  const allCats = translate.getAllEmojiForWord('cat')
  t.equal(allCats.length > 2, true, 'cat is translated to many things')
  t.equal(allCats.indexOf('🐱') !== -1, true, 'cat is translated to 🐱')
  t.equal(allCats.indexOf('🙀') !== -1, true, 'cat is translated to 🙀')
  t.equal(allCats.indexOf('👻') === -1, true, 'cat is not translated to 👻')
  t.end()
})

test('translate', function (t) {
  const sentence = 'the house is on fire and the cat is eating the cake'
  const translated = translate.translate(sentence)
  t.equal(
    translated,
    'the house 🏘 is on 🔛 fire 🔥 and the cat 😺 is eating 🍽 the cake 🍰',
    'sentence can be translated to something with words')
  t.end()
})

test('punctuation', function (t) {
  // Exclamation marks should be preserved
  t.equal(2, translate.translate('YES! victory!').match(/!/g).length)
  t.end()
})

test('flags', function (t) {
  // these should not be flags.
  t.equal('im', translate.translate('im').trim())
  t.equal('in', translate.translate('in').trim())

  // YES should not have a flag.
  t.equal(-1, translate.getAllEmojiForWord('yes').indexOf('🇾🇪'))
  t.end()
})

test('ing verbs', function (t) {
  // English sucks. Dance+ing = dancing, run+ing = running, eat+ing = eating;
  t.notEqual('saving', translate.translate('saving').trim())
  t.notEqual('running', translate.translate('running').trim())
  t.notEqual('eating', translate.translate('eating').trim())
  t.end()
})

test('omg what is real', function (t) {
  t.notEqual('hi', translate.translate('hi').trim())
  t.notEqual('', translate.translate('welcome back, emoji robot! ready to take over the world?', true))
  t.end()
})
