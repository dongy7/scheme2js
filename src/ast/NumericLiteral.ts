export default class NumericLiteral implements NumberNode {
  public value: string

  constructor(value: string) {
    this.value = value
  }

  public visit(v: Visitor): ASTNode {
    return v.visitNumericLiteral(this)
  }
}
