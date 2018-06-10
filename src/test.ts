import Compiler from './compiler'

const tokens = Compiler.tokenizer('(add 1 2)')
const parser = new Compiler.parser(tokens)
parser.parse()
