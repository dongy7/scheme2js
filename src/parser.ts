import * as ast from './ast'
import Program from './ast/Program'
import NumericLiteral from './ast/NumericLiteral'
import SymbolLiteral from './ast/SymbolLiteral'
import DefineExpression from './ast/DefineExpression'
import IfExpression from './ast/IfExpression'
import CallExpression from './ast/CallExpression'
import LambdaExpression from './ast/LambdaExpression'
import ParameterList from './ast/ParameterList'

class Parser {
  private tokens: Token[]
  private currToken: Token
  private pos: number
  constructor(tokens: Token[]) {
    this.tokens = tokens
    this.pos = 0
    this.currToken = this.tokens[this.pos]
  }

  public parse(): Program {
    return this.parseProgram()
  }

  private parseProgram(): Program {
    const program = new Program()
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
    switch (this.currToken.type) {
      case 'name':
        return this.parseSymbol()
      case 'number':
        return this.parseNumber()
      case 'paren':
        // accept (
        this.acceptIt()
        switch (this.currToken.value) {
          case 'define':
            this.acceptIt()
            const symbol = this.parseSymbol()
            const expr = this.parseExpr()
            this.accept('paren')
            return new DefineExpression(symbol, expr)
          case 'if':
            this.acceptIt()
            const test = this.parseExpr()
            const conseq = this.parseExpr()
            const alt = this.parseExpr()
            this.accept('paren')
            return new IfExpression(test, conseq, alt)
          case 'lambda':
            this.acceptIt()
            const params = this.parseParams()
            const body = this.parseExpr()
            return new LambdaExpression(params, body)
          default:
            const id = this.parseSymbol()
            const callExpr = new CallExpression(id)

            while (
              this.currToken.type !== 'paren' ||
              (this.currToken.type === 'paren' && this.currToken.value !== ')')
            ) {
              switch (this.currToken.type) {
                // @ts-ignore
                case 'number':
                  callExpr.params.push(this.parseNumber())
                  break
                // @ts-ignore
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
      default:
        throw new SyntaxError()
    }
  }

  private parseParams(): ParameterList {
    const params = []

    // multiple parameters
    if (this.currToken.type === 'paren') {
      // accept (
      this.acceptIt()
      while (
        this.currToken.type !== 'paren' ||
        (this.currToken.type === 'paren' && this.currToken.value !== ')')
      ) {
        params.push(this.parseSymbol())
      }

      // accept )
      this.acceptIt()
    } else {
      // single parameter
      params.push(this.parseSymbol())
    }

    return new ParameterList(params)
  }

  private parseSymbol(): SymbolLiteral {
    const symbol = new SymbolLiteral(this.currToken.value)

    this.acceptIt()
    return symbol
  }

  private parseNumber(): NumericLiteral {
    const num = new NumericLiteral(this.currToken.value)

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

export default Parser
