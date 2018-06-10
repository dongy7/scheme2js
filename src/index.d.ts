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

interface INode {
  name?: string
  context?: ASTNode[]
}

interface NumberNode extends INode {
  type: 'NumberLiteral'
  value: string
}

interface SymbolNode extends INode {
  type: 'SymbolLiteral'
  value: string
}

interface OpNode extends INode {
  type: 'Operator'
  value: string
}

interface CallExpr extends INode {
  type: 'CallExpression'
  // name: string
  proc: SymbolNode
  params: ASTNode[]
}

interface ProgramNode extends INode {
  type: 'Program'
  body: ASTNode[]
}

interface DefineExpr extends INode {
  type: 'DefineExpr'
  ref: SymbolNode
  value: ASTNode
}

interface IfExpr extends INode {
  type: 'IfExpr'
  test: ASTNode
  conseq: ASTNode
  alt: ASTNode
}

interface BinExpr extends INode {
  type: 'BinExpr'
  left: Expression
  op: OpNode
  right: Expression
}

type Expression = CallExpr | DefineExpr | IfExpr | SymbolNode | NumberNode

type ASTNode =
  | NumberNode
  | SymbolNode
  | CallExpr
  | ProgramNode
  | DefineExpr
  | IfExpr

interface Visitor {
  enter: (INode: ASTNode, parent: ASTNode | null) => void
  exit?: (INode: ASTNode, parent: ASTNode | null) => void
}

interface Visitors {
  [type: string]: Visitor
}
