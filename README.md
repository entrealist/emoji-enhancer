# emoji-enhancer
Inject emojis after each word in a text.

## About this fork
It's a refactored and simplified version of [notwaldorf/emoji-translate](https://github.com/notwaldorf/emoji-translate).

The main difference is that the lib "translates" emojis by inserting them after respective words instead of replacing them.

E.g. sentence
> the house is on fire and the cat is eating the cake

gets translated to

> the house 🏘 is on 🔛 fire 🔥 and the cat 😺 is eating 🍽 the cake 🍰

It only exports few original methods:
  * `isEmoji` -- returns true if a character is already an emoji
  * `getAllEmojiForWord(word)` -- returns a list of possible emoji translations
  * `translate(chunk)` -- returns a translation of the whole chunk of text


## Sample demo
https://postatum.github.io/emoji-enhancer/
