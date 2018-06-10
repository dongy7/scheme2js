export default class BinaryExpression implements BinExpr {
  public left: ASTNode
  public right: ASTNode
  public op: SymbolNode

  constructor(left: ASTNode, right: ASTNode, op: SymbolNode) {
    this.left = left
    this.right = right
    this.op = op
  }

  public visit(v: Visitor) {
    return this
  }
}
