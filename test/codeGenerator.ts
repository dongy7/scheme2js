import Compiler from '../src/compiler'

it('Generates function call', () => {
  const tokens = Compiler.tokenizer('(add 1 (sub 2 3))')
  const parser = new Compiler.parser(tokens)
  const ast = parser.parse()
  expect(Compiler.codeGenerator(ast)).toMatchSnapshot()
})
