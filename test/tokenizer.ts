import Compiler from '../src/compiler'

it('tokenizes number', () => {
  expect(Compiler.tokenizer('123')).toMatchSnapshot()
})

it('tokenizes negative number', () => {
  expect(Compiler.tokenizer('-123')).toMatchSnapshot()
})

it('tokenizes parens', () => {
  expect(Compiler.tokenizer('()')).toMatchSnapshot()
})

it('tokenizes names', () => {
  expect(Compiler.tokenizer('foo')).toMatchSnapshot()
})

it('tokenizes a list', () => {
  expect(Compiler.tokenizer('(123 foo (bar baz))')).toMatchSnapshot()
})
