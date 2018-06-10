export default class ParameterList implements ParameterListNode {
  public params: SymbolNode[]
  constructor(params: SymbolNode[]) {
    this.params = params
  }

  public visit(v: Visitor) {
    return this
  }
}
