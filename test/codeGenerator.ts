import Compiler from '../src/compiler'

it('Generates function call', () => {
  const tokens = Compiler.tokenizer('(add 1 (sub 2 3))')
  const ast = Compiler.parser(tokens)
  const newAst = Compiler.transformer(ast)
  expect(Compiler.codeGenerator(newAst)).toMatchSnapshot()
})
