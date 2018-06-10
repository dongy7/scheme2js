export default class LambdaExpression implements LambdaExpr {
  public params: ASTNode[]
  public body: ASTNode
  constructor(params: ASTNode[], body: ASTNode) {
    this.params = params
    this.body = body
  }

  public visit(v: Visitor) {
    return this
  }
}
