export default class SymbolLiteral implements SymbolNode {
  public value: string

  constructor(value: string) {
    this.value = value
  }

  public visit(v: Visitor): ASTNode {
    return v.visitSymbolLiteral(this)
  }
}
