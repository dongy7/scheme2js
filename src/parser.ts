class Parser {
  private tokens: Token[]
  private currToken: Token
  private pos: number
  constructor(tokens: Token[]) {
    this.tokens = tokens
    this.pos = 0
    this.currToken = this.tokens[this.pos]
  }

  public parse(): ProgramNode {
    return this.parseProgram()
  }

  private parseProgram(): ProgramNode {
    const program: ProgramNode = {
      type: 'Program',
      body: [],
    }

    program.body = this.parseExprList()

    return program
  }

  private parseExprList(): Expression[] {
    const exprList = []
    while (
      this.currToken &&
      this.currToken.type === 'paren' &&
      this.currToken.value === '('
    ) {
      exprList.push(this.parseExpr())
    }
    return exprList
  }

  private parseExpr(): Expression {
    // accept (
    this.acceptIt()
    switch (this.currToken.value) {
      case 'define':
        this.acceptIt()
        const symbol = this.parseSymbol()
        const expr = this.parseExpr()
        this.accept('paren')
        return {
          type: 'DefineExpr',
          ref: symbol,
          value: expr,
        }
      case 'if':
        this.acceptIt()
        const test = this.parseExpr()
        const conseq = this.parseExpr()
        const alt = this.parseExpr()
        this.accept('paren')
        return {
          type: 'IfExpr',
          test,
          conseq,
          alt,
        }
      default:
        const id = this.parseSymbol()
        const callExpr: CallExpr = {
          type: 'CallExpression',
          proc: id,
          params: [],
        }

        while (
          this.currToken.type !== 'paren' ||
          (this.currToken.type === 'paren' && this.currToken.value !== ')')
        ) {
          switch (this.currToken.type) {
            case 'number':
              callExpr.params.push(this.parseNumber())
              break
            case 'name':
              callExpr.params.push(this.parseSymbol())
              break
            case 'paren':
              callExpr.params.push(this.parseExpr())
              break
          }
        }

        // accept )
        this.acceptIt()

        return callExpr
    }
  }

  private parseSymbol(): SymbolNode {
    const symbol: SymbolNode = {
      type: 'SymbolLiteral',
      value: this.currToken.value,
    }

    this.acceptIt()
    return symbol
  }

  private parseNumber(): NumberNode {
    const num: NumberNode = {
      type: 'NumberLiteral',
      value: this.currToken.value,
    }

    this.acceptIt()
    return num
  }

  private acceptIt() {
    this.accept(this.currToken.type)
  }

  private accept(tokenKind: string) {
    if (this.currToken.type !== tokenKind) {
      throw new SyntaxError(
        `Expecting ${tokenKind} but found ${this.currToken.type}`
      )
    } else {
      this.pos++
      this.currToken = this.tokens[this.pos]
    }
  }
}

// const parser = (tokens: Token[]): ASTNode => {
//   let pos = 0

//   const walk = (): ASTNode => {
//     let token = tokens[pos]

//     if (token.type === 'number') {
//       pos++
//       return {
//         type: 'NumberLiteral',
//         value: token.value,
//       }
//     }

//     if (token.type === 'name') {
//       pos++
//       return {
//         type: 'SymbolLiteral',
//         value: token.value,
//       }
//     }

//     if (token.type === 'paren' && token.value === '(') {
//       token = tokens[++pos]

//       switch (token.value) {
//         case 'define':

//         case 'if':
//         default:
//       }

//       const node: ASTNode = {
//         type: 'CallExpression',
//         name: token.value,
//         params: [],
//       }

//       // skip name
//       token = tokens[++pos]

//       while (
//         token.type !== 'paren' ||
//         (token.type === 'paren' && token.value !== ')')
//       ) {
//         node.params.push(walk())
//         token = tokens[pos]
//       }

//       // skip closing parens
//       pos++
//       return node
//     }

//     throw new TypeError(token.type)
//   }

//   const ast: ProgramNode = {
//     type: 'Program',
//     body: [],
//   }

//   while (pos < tokens.length) {
//     ast.body.push(walk())
//   }

//   return ast
// }

export default Parser
