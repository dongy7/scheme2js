export default class Program implements ProgramNode {
  public body: ASTNode[]

  constructor() {
    this.body = []
  }

  public visit(v: Visitor): ASTNode {
    return v.visitProgram(this)
  }
}
