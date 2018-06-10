// Definitions for Lisp types
type Sym = string
type Num = number
type Atom = Sym | Num
type List = Array<Atom | Atom[]>
type Exp = Atom | List
interface Env {
  variable: Exp
}

interface Token {
  type: 'paren' | 'number' | 'name' | 'op'
  value: string
}

interface Visitor {
  visitNumericLiteral(node: NumberNode): ASTNode
  visitSymbolLiteral(node: SymbolNode): ASTNode
  visitCallExpression(node: CallExpr): ASTNode
  visitProgram(node: ProgramNode): ASTNode
  visitDefineExpression(node: DefineExpr): ASTNode
  visitIfExpression(node: IfExpr): ASTNode
}

interface AST {
  visit(v: Visitor): ASTNode
}

interface NumberNode extends AST {
  value: string
}

interface SymbolNode extends AST {
  value: string
}

interface OpNode extends AST {
  value: string
}

interface CallExpr extends AST {
  proc: SymbolNode
  params: ASTNode[]
}

interface ProgramNode extends AST {
  body: ASTNode[]
}

interface DefineExpr extends AST {
  ref: SymbolNode
  value: ASTNode
}

interface IfExpr extends AST {
  test: ASTNode
  conseq: ASTNode
  alt: ASTNode
}

interface BinExpr extends AST {
  left: ASTNode
  op: SymbolNode
  right: ASTNode
}

type Expression = CallExpr | DefineExpr | IfExpr | SymbolNode | NumberNode

type ASTNode =
  | NumberNode
  | SymbolNode
  | CallExpr
  | ProgramNode
  | DefineExpr
  | IfExpr
  | BinExpr
