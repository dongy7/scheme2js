export default class CallExpression implements CallExpr {
  public params: ASTNode[]
  public proc: SymbolNode
  constructor(proc: SymbolNode) {
    this.proc = proc
    this.params = []
  }

  public visit(v: Visitor): ASTNode {
    return v.visitCallExpression(this)
  }
}
