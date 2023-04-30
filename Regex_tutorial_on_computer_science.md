# Regex on Computer Science
---

#### Table of content
- [Intro](#Itro)
- [Components](#Components)
- [Literals](#Literals)
- [Character Classes](#Character_Classes)
- [Quantifiers](#Quantifiers)
- [Alternation](#Alternation)
- [Anchors](#Anchors)
- [Groups](#Groups)
- [Example](#Example)
- [Author](#Author)

***
### Intro

##### What is Regex

Regex (short for "regular expression") is a tool that computer scientists use to find and manipulate specific patterns in text. It's like a secret code that helps us find words, numbers, and other patterns that match certain criteria. This code can be used to extract information from text or make changes to it automatically. Regex is a valuable skill to have if you're interested in working with text data in areas like web development or data science.

---

### Components

#### Literals
- These are characters that match the same characters in the text you're searching for. For example, the pattern  `` /hello/ `` matches the word "hello" exactly. Here's an example of a literal in a regular expression: ``` /dog/ ``` 
This pattern matches the string "dog" exactly.
---

### Character Classes
-  A character class is a set of characters that can be matched. For example, the character class [aeiou] matches any vowel character. Here's an example of a character class in a regular expression:
`` /[aeiou]/ ``
This pattern matches any vowel character in the text.
---

### Quantifiers
- Quantifiers are used to specify how many times a character or group should be matched. For example, the asterisk `` (*) `` matches zero or more occurrences of the preceding character or group. Here's an example of a quantifier in a regular expression:
javascript
Copy code
`` /go*d/ ``
This pattern matches any string that has a 'g', followed by zero or more 'o's, followed by a 'd'. For example, it would match `` "gd", "god", "good", "gooooood" `` and so on.
---

### Alternation
- Alternation is used to match one pattern or another. The vertical bar (|) separates the options. Here's an example of alternation in a regular expression:
`` /cat|dog/ ``
This pattern matches either the word "cat" or the word  `` "dog" ``.
---

### Anchors
- Anchors are used to match the beginning or end of a line or string. The caret `` (^) `` matches the beginning of a line or string, while the dollar sign `` ($) ``matches the end of a line or string. Here's an example of an anchor in a regular expression:
 `` /^hello/ ``
This pattern matches any string that starts with the word "hello". For example, it would match  `` "hello world" ``, but not `` "world hello" ``.
---

### Groups
- You can group characters or sub-patterns together using parentheses. This can be useful for applying quantifiers to a group of characters, or for capturing a specific part of a string. Here's an example of grouping in a regular expression:
`` /(dog|cat)s?/ ``
This pattern matches either the word "dog" or the word `` "cat" ``, followed by an optional `` 's' `` character.

By using these different components in different combinations, we can create complex patterns that help us search for specific pieces of text in a more efficient and accurate way.

---

### Example


#### Matching a Hex Value –   `  /^#?([a-f0-9]{6}|[a-f0-9]{3})$/  `

The regular expression `` /^#?([a-f0-9]{6}|[a-f0-9]{3})$/ `` is used to match a hexadecimal color code in a string of text. Here's what each component of the regular expression does:

- `` ^ `` matches the start of the string.

- `` #?  ``matches an optional "#" character at the beginning of the string.

- `` ([a-f0-9]{6}|[a-f0-9]{3}) `` matches either six or three characters that can appear in a valid hexadecimal color code. Specifically, it matches any combination of the letters a-f (both uppercase and lowercase) and the numbers 0-9, and it requires there to be either six or three of these characters in a row.

- `` $ `` matches the end of the string.

Overall, this regular expression can be used to validate whether a string is a valid hexadecimal color code, whether it is preceded by a "#" character or not.

---

#### Author

#### Ferny Castro
[Github](https://github.com/FernyCastro8)
