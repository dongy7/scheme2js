export default class BooleanExpression implements BooleanExpr {
  public op: SymbolNode
  public params: ASTNode[]
  constructor(op: SymbolNode, params: ASTNode[]) {
    this.op = op
    this.params = params
  }

  public visit(v: Visitor): ASTNode {
    return this
  }
}
