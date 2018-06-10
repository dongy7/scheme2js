import Program from './ast/Program'

const transformer = (ast: Program, visitor: Visitor) => {
  return ast.visit(visitor)
}

export default transformer
