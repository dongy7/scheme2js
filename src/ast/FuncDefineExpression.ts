export default class FuncDefineExpression implements FunctionDefineExpr {
  public ref: SymbolNode
  public params: ParameterListNode
  public body: ASTNode

  constructor(ref: SymbolNode, params: ParameterListNode, body: ASTNode) {
    this.ref = ref
    this.params = params
    this.body = body
  }

  public visit(v: Visitor): ASTNode {
    return v.visitFuncDefineExpression(this)
  }
}
