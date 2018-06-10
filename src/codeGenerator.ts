import * as ast from './ast'
import Program from './ast/Program'
import CallExpression from './ast/CallExpression'
import DefineExpression from './ast/DefineExpression'
import IfExpression from './ast/IfExpression'
import NumericLiteral from './ast/NumericLiteral'
import SymbolLiteral from './ast/SymbolLiteral'

const codeGenerator = (node: ASTNode): string => {
  if (node instanceof Program) {
    return node.body.map(codeGenerator).join('\n')
  } else if (node instanceof CallExpression) {
    return (
      node.proc.value + '(' + node.params.map(codeGenerator).join(', ') + ')'
    )
  } else if (node instanceof DefineExpression) {
    return 'var ' + codeGenerator(node.ref) + ' = ' + codeGenerator(node.value)
  } else if (node instanceof IfExpression) {
    return (
      codeGenerator(node.test) +
      ' ? ' +
      codeGenerator(node.conseq) +
      ' : ' +
      codeGenerator(node.alt)
    )
  } else if (node instanceof NumericLiteral) {
    return node.value
  } else if (node instanceof SymbolLiteral) {
    return node.value
  } else {
    throw new TypeError()
  }
}

export default codeGenerator
