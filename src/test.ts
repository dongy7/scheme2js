import compiler from './compiler'

const text = `
(add 1 (sub 1 2))
`

const tokens = compiler.tokenizer(text)
const ast = compiler.parser(tokens)
const newAst = compiler.transformer(ast)
console.log(compiler.codeGenerator(newAst))
