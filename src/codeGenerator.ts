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
import BooleanExpression from './ast/BooleanExpression'
import FuncDefineExpression from './ast/FuncDefineExpression'

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
    if (node.value === '=') {
      return '=='
    }
    return node.value
  } else if (node instanceof BinaryExpression) {
    return (
      stringifySubExp(node.left) +
      ' ' +
      codeGenerator(node.op) +
      ' ' +
      stringifySubExp(node.right)
    )
  } else if (node instanceof BooleanExpression) {
    const op = node.op.value
    switch (op) {
      case 'and':
        return node.params.map(stringifySubExp).join(' && ')
      case 'or':
        return node.params.map(stringifySubExp).join(' || ')
      case 'not':
        return `!${codeGenerator(node.params[0])}`
      default:
        throw new SyntaxError(`Unexpected boolean op: ${op}`)
    }
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
  } else if (node instanceof FuncDefineExpression) {
    return (
      'function ' +
      codeGenerator(node.ref) +
      '(' +
      codeGenerator(node.params) +
      ') { ' +
      node.internalDefs.map(codeGenerator) +
      'return ' +
      codeGenerator(node.value) +
      ' }'
    )
  } else {
    throw new TypeError()
  }
}

const stringifySubExp = (expr: ASTNode) => {
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
