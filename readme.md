# scheme2js

> Compiler for transpiling Scheme to JavaScript

## Demo

You can see the live demo [here](https://dongyeop.com/sandbox/).

## Installation

```sh
$ npm install scheme2js
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

### Function Definition

Lisp

```lisp
(define (plusOne x) (+ x 1))
```

JavaScript

```js
function plusOne(x) {
  return x + 1
}
```

### Nested Definitions

Lisp

```lisp
(define (addOne x)
  (define (add y) (+ x y))
  (add 1))
```

JavaScript

```js
function addOne(x) {
  function add(y) {
    return x + y
  }
  return add(1)
}
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

### Boolean Expressions

Lisp

```lisp
(and (x > 5) (x < 10))
```

JavaScript

```js
(x > 5) && (x < 10)
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

## Polyfills

### Pairs

To add support for `cons`, `car`, `cdr` procedures, specify the `--pairs` or `-p` option.

```sh
$ s2j script.scm --pairs
```

This will add the required polyfill and define it globally.