# emoji-translate
You know how sometimes you type English and it has all these letters and words and no emoji? Yeah, emoji-translate fixes that.

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


## TODO
The lib:
- [ ] multilang support
- [ ] return data as JSON instead of replacing words on-site

Web demo:
- [ ] if more than 1 emoji found, let users pick the one they want
- [ ] input language picker
