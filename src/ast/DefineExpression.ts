export default class DefineExpression implements DefineExpr {
  public value: ASTNode
  public ref: SymbolNode
  constructor(ref: SymbolNode, expr: ASTNode) {
    this.ref = ref
    this.value = expr
  }

  public visit(v: Visitor): ASTNode {
    return v.visitDefineExpression(this)
  }
}
