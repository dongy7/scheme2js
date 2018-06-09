import Compiler from '../src/compiler'

it('parses empty program', () => {
  const tokens = Compiler.tokenizer('')
  expect(Compiler.parser(tokens)).toMatchSnapshot()
})

it('parses function call', () => {
  const tokens = Compiler.tokenizer('(add 1 2)')
  expect(Compiler.parser(tokens)).toMatchSnapshot()
})

it('parses nested function call', () => {
  const tokens = Compiler.tokenizer('(add 1 (sub 2 3))')
  expect(Compiler.parser(tokens)).toMatchSnapshot()
})
