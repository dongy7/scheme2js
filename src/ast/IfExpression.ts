export default class IfExpression implements IfExpr {
  public test: ASTNode
  public conseq: ASTNode
  public alt: ASTNode

  constructor(test: ASTNode, conseq: ASTNode, alt: ASTNode) {
    this.test = test
    this.conseq = conseq
    this.alt = alt
  }

  public visit(v: Visitor): ASTNode {
    return v.visitIfExpression(this)
  }
}
