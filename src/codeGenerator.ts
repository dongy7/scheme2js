import * as ast from './ast'
import Program from './ast/Program'
import CallExpression from './ast/CallExpression'
import DefineExpression from './ast/DefineExpression'
import IfExpression from './ast/IfExpression'
import NumericLiteral from './ast/NumericLiteral'
import SymbolLiteral from './ast/SymbolLiteral'
import BinaryExpression from './ast/BinaryExpression'
import LambdaExpression from './ast/LambdaExpression'
import ParameterList from './ast/ParameterList'

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
  } else if (node instanceof BinaryExpression) {
    return (
      stringifyBinSubExp(node.left) +
      ' ' +
      codeGenerator(node.op) +
      ' ' +
      stringifyBinSubExp(node.right)
    )
  } else if (node instanceof LambdaExpression) {
    return (
      'function(' +
      codeGenerator(node.params) +
      ') { return ' +
      codeGenerator(node.body) +
      ' }'
    )
  } else if (node instanceof ParameterList) {
    return node.params.map(codeGenerator).join(', ')
  } else {
    throw new TypeError()
  }
}

const stringifyBinSubExp = (expr: ASTNode) => {
  const code = codeGenerator(expr)

  // If expression is an atom just return string representation
  if (expr instanceof NumericLiteral || expr instanceof SymbolLiteral) {
    return code
  } else {
    // otherwise wrap expression in parenthesis
    return `(${code})`
  }
}

export default codeGenerator
