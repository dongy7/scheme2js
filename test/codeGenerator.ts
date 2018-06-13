import compile from '../src'

it('Generates function call', () => {
  const code = '(add 1 (sub 2 3))'
  expect(compile(code)).toMatchSnapshot()
})

it('Generates variable declaration', () => {
  const code = '(define a 1)'
  expect(compile(code)).toMatchSnapshot()
})

it('Generates if expressions', () => {
  const code = '(if (eq 1 2) 3 4)'
  expect(compile(code)).toMatchSnapshot()
})

it('Generates correct binary expression', () => {
  const code = '(+ 1 2)'
  expect(compile(code)).toMatchSnapshot()
})

it('Generates correct anonymous function expression', () => {
  const code = '(lambda (x y) (+ x y))'
  expect(compile(code)).toMatchSnapshot()
})

it('Generates correct anonymous function definition', () => {
  const code = '(define add (lambda (x y) (+ x y)))'
  expect(compile(code)).toMatchSnapshot()
})

it('Generates correct binary expression with parenthesis', () => {
  const code = '(* (+ 1 2) 3)'
  expect(compile(code)).toMatchSnapshot()
})

it('Generates correct boolean expression with parenthesis', () => {
  const code = '(and (> x 5) (< x 10))'
  expect(compile(code)).toMatchSnapshot()
})

it('Generates correct equality expression', () => {
  const code = '(= 1 2)'
  expect(compile(code)).toMatchSnapshot()
})

it('Generates function definition', () => {
  const code = `(define (foo x) (+ x 1))`
  expect(compile(code)).toMatchSnapshot()
})

it('Generates function definition with internal definitions', () => {
  const code = `
    (define (addOne x)
      (define (add y) (+ x y))
      (add x))
  `
  expect(compile(code)).toMatchSnapshot()
})
