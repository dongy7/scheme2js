import Compiler from './compiler'

const tokens = Compiler.tokenizer('(define a 1)')
const parser = new Compiler.parser(tokens)
parser.parse()
