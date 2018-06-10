import Compiler from '../src/compiler'

it('parses empty program', () => {
  const tokens = Compiler.tokenizer('')
  const parser = new Compiler.parser(tokens)
  expect(parser.parse()).toMatchSnapshot()
})

it('parses function call', () => {
  const tokens = Compiler.tokenizer('(add 1 2)')
  const parser = new Compiler.parser(tokens)
  expect(parser.parse()).toMatchSnapshot()
})

it('parses nested function call', () => {
  const tokens = Compiler.tokenizer('(add 1 (sub 2 3))')
  const parser = new Compiler.parser(tokens)
  expect(parser.parse()).toMatchSnapshot()
})

it('parses expr with operator', () => {
  const tokens = Compiler.tokenizer('(+ 1 (- 2 3))')
  const parser = new Compiler.parser(tokens)
  expect(parser.parse()).toMatchSnapshot()
})

it('parses define expression', () => {
  const tokens = Compiler.tokenizer('(define a 1)')
  const parser = new Compiler.parser(tokens)
  expect(parser.parse()).toMatchSnapshot()
})

it('parses if expression', () => {
  const tokens = Compiler.tokenizer('(if (eq 1 2) 3 4)')
  const parser = new Compiler.parser(tokens)
  expect(parser.parse()).toMatchSnapshot()
})

it('parses nested if expression', () => {
  const tokens = Compiler.tokenizer('(if (eq 1 2) (add 4 5) 6)')
  const parser = new Compiler.parser(tokens)
  expect(parser.parse()).toMatchSnapshot()
})
