const traverser = (ast: ASTNode, visitors: Visitors) => {
  const traverseArray = (array: ASTNode[], parent: ASTNode | null) => {
    array.forEach(child => {
      traverseNode(child, parent)
    })
  }

  const traverseNode = (node: ASTNode, parent: ASTNode | null) => {
    const methods = visitors[node.type]

    if (methods && methods.enter) {
      methods.enter(node, parent)
    }

    switch (node.type) {
      case 'Program':
        traverseArray(node.body, node)
        break
      case 'CallExpression':
        traverseArray(node.params, node)
        break
      case 'NumberLiteral':
      case 'SymbolLiteral':
        break
      default:
        throw new TypeError(node.type)
    }

    if (methods && methods.exit) {
      methods.exit(node, parent)
    }
  }

  traverseNode(ast, null)
}

export default traverser
