import Compiler from '../src/compiler'

it('Generates function call', () => {
  const tokens = Compiler.tokenizer('(add 1 (sub 2 3))')
  const parser = new Compiler.parser(tokens)
  const ast = parser.parse()
  expect(Compiler.codeGenerator(ast)).toMatchSnapshot()
})

it('Generates variable declaration', () => {
  const tokens = Compiler.tokenizer('(define a 1)')
  const parser = new Compiler.parser(tokens)
  const ast = parser.parse()
  expect(Compiler.codeGenerator(ast)).toMatchSnapshot()
})

it('Generates if expressions', () => {
  const tokens = Compiler.tokenizer('(if (eq 1 2) 3 4)')
  const parser = new Compiler.parser(tokens)
  const ast = parser.parse()
  expect(Compiler.codeGenerator(ast)).toMatchSnapshot()
})
