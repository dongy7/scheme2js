import compiler from './compiler'
import jsTransform from './visitors/js'

const compile = (code: string): string => {
  const tokens = compiler.tokenizer(code)
  const parser = new compiler.parser(tokens)
  const ast = parser.parse()
  const jsAst = compiler.transformer(ast, jsTransform)
  return compiler.codeGenerator(jsAst)
}

export default compile
