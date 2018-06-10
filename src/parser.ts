const parser = (tokens: Token[]): ASTNode => {
  let pos = 0

  const walk = (): ASTNode => {
    let token = tokens[pos]

    if (token.type === 'number') {
      pos++
      return {
        type: 'NumberLiteral',
        value: token.value,
      }
    }

    if (token.type === 'name') {
      pos++
      return {
        type: 'SymbolLiteral',
        value: token.value,
      }
    }

    if (token.type === 'paren' && token.value === '(') {
      token = tokens[++pos]
      const node: ASTNode = {
        type: 'CallExpression',
        name: token.value,
        params: [],
      }

      // skip name
      token = tokens[++pos]

      while (
        token.type !== 'paren' ||
        (token.type === 'paren' && token.value !== ')')
      ) {
        node.params.push(walk())
        token = tokens[pos]
      }

      // skip closing parens
      pos++
      return node
    }

    throw new TypeError(token.type)
  }

  const ast: ProgramNode = {
    type: 'Program',
    body: [],
  }

  while (pos < tokens.length) {
    ast.body.push(walk())
  }

  return ast
}

export default parser
