# scheme2js

> Compiler for transpiling Scheme to JavaScript

```sh
$ npm install -g scheme2js
```

## CLI

Compile the file `script.scm` and output it to stdout.

```sh
$ s2j script.scm
```

Compile the file `script.scm` and output it to `script.js`

```sh
$ s2j script.scm -o script.js
```

## API

```js
const s2j = require('scheme2js')
const code = '(+ 1 2)'
const result = s2j(code) // '1 + 2'
```

## Features

### Expressions

Lisp

```lisp
(add 1 2)
```

JavaScript

```js
add(1, 2)
```

### Naming

Lisp

```lisp
(define foo 1)
```

JavaScript

```js
var foo = 1
```

### Conditional Expressions

Lisp

```lisp
(if
  (eq a b)
  c
  d)
```

JavaScript

```js
eq(a, b) ? c : d
```

### Binary Expressions

Lisp

```lisp
(+ 1 2)
```

JavaScript

```js
1 + 2
```

### Lambda Expressions

Lisp

```lisp
(lambda (x y) (+ x y))
```

JavaScript

```js
function(x, y) {
  return x + y
}
```