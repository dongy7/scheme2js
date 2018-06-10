import traverser from './traverser'

const transformer = (ast: ASTNode): ASTNode => {
  const newAst: ProgramNode = {
    type: 'Program',
    body: [],
  }

  ast.context = newAst.body
  const visitors: Visitors = {
    NumberLiteral: {
      enter: (node, parent) => {
        parent!.context!.push(node)
      },
    },
    SymbolLiteral: {
      enter: (node, parent) => {
        parent!.context!.push(node)
      },
    },
    CallExpression: {
      enter: (node, parent) => {
        const expr: CallNode = {
          type: 'CallExpression',
          name: node.name,
          params: [],
        }

        node.context = expr.params
        parent!.context!.push(node)
      },
    },
  }
  const rootContext = newAst.body
  traverser(ast, visitors)
  return newAst
}

export default transformer
