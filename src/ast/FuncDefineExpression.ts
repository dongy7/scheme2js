export default class FuncDefineExpression implements FunctionDefineExpr {
  public ref: SymbolNode
  public params: ParameterListNode
  public internalDefs: ASTNode[]
  public value: ASTNode

  constructor(
    ref: SymbolNode,
    params: ParameterListNode,
    internalDefs: ASTNode[],
    value: ASTNode
  ) {
    this.ref = ref
    this.params = params
    this.internalDefs = internalDefs
    this.value = value
  }

  public visit(v: Visitor): ASTNode {
    return v.visitFuncDefineExpression(this)
  }
}
