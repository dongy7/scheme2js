export default class LambdaExpression implements LambdaExpr {
  public params: ParameterListNode
  public body: ASTNode
  constructor(params: ParameterListNode, body: ASTNode) {
    this.params = params
    this.body = body
  }

  public visit(v: Visitor): ASTNode {
    return v.visitLambdaExpression(this)
  }
}
