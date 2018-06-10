const codeGenerator = (node: ASTNode): string => {
  switch (node.type) {
    case 'Program':
      return node.body.map(codeGenerator).join('\n')
    case 'CallExpression':
      return node.name + '(' + node.params.map(codeGenerator).join(', ') + ')'
    case 'SymbolLiteral':
      return node.value
    case 'NumberLiteral':
      return node.value
    default:
      console.log(node)
      throw new TypeError(node.type)
  }
}

export default codeGenerator
