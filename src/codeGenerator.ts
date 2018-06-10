const codeGenerator = (node: ASTNode): string => {
  switch (node.type) {
    case 'Program':
      return node.body.map(codeGenerator).join('\n')
    case 'CallExpression':
      return (
        node.proc.value + '(' + node.params.map(codeGenerator).join(', ') + ')'
      )
    case 'SymbolLiteral':
      return node.value
    case 'NumberLiteral':
      return node.value
    case 'DefineExpr':
      return (
        'var ' + codeGenerator(node.ref) + ' = ' + codeGenerator(node.value)
      )
    case 'IfExpr':
      return (
        codeGenerator(node.test) +
        ' ? ' +
        codeGenerator(node.conseq) +
        ' : ' +
        codeGenerator(node.alt)
      )

    default:
      throw new TypeError()
  }
}

export default codeGenerator
