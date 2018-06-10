import Compiler from '../src/compiler'
import js from '../src/visitors/js'
import transformer from '../src/transformer'

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

it('Generates correct binary expression', () => {
  const tokens = Compiler.tokenizer('(+ 1 2)')
  const parser = new Compiler.parser(tokens)
  const ast = parser.parse()
  const jsAst = Compiler.transformer(ast, js)
  expect(Compiler.codeGenerator(jsAst)).toMatchSnapshot()
})

it('Generates correct anonymous function expression', () => {
  const tokens = Compiler.tokenizer('(lambda (x y) (+ x y))')
  const parser = new Compiler.parser(tokens)
  const ast = parser.parse()
  const jsAst = Compiler.transformer(ast, js)
  expect(Compiler.codeGenerator(jsAst)).toMatchSnapshot()
})

it('Generates correct anonymous function definition', () => {
  const tokens = Compiler.tokenizer('(define add (lambda (x y) (+ x y)))')
  const parser = new Compiler.parser(tokens)
  const ast = parser.parse()
  const jsAst = Compiler.transformer(ast, js)
  expect(Compiler.codeGenerator(jsAst)).toMatchSnapshot()
})
