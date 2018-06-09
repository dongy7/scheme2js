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
  type: 'paren' | 'number' | 'name'
  value: string
}

interface NumberNode {
  type: 'NumberLiteral'
  value: string
}

interface SymbolNode {
  type: 'SymbolLiteral'
  value: string
}

interface CallNode {
  type: 'CallExpression'
  name: string
  params: ASTNode[]
}

type ASTNode = NumberNode | SymbolNode | CallNode

interface ProgramNode {
  type: 'Program'
  body: ASTNode[]
}
