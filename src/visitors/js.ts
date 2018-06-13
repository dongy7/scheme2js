import IfExpression from '../ast/IfExpression'
import DefineExpression from '../ast/DefineExpression'
import SymbolLiteral from '../ast/SymbolLiteral'
import Program from '../ast/Program'
import BinaryExpression from '../ast/BinaryExpression'
import CallExpression from '../ast/CallExpression'
import { isValidOp, isBooleanOp } from '../utils'
import LambdaExpression from '../ast/LambdaExpression'
import BooleanExpression from '../ast/BooleanExpression'
import FuncDefineExpression from '../ast/FuncDefineExpression'
import ParameterList from '../ast/ParameterList'

const visitor: Visitor = {
  visitCallExpression(node) {
    if (isValidOp(node.proc.value)) {
      const leftExpr = node.params[0].visit(this)
      const rightExpr = node.params[1].visit(this)
      return new BinaryExpression(leftExpr, rightExpr, node.proc)
    }

    if (isBooleanOp(node.proc.value)) {
      const params = node.params.map(param => param.visit(this))
      return new BooleanExpression(node.proc, params)
    }

    const proc = node.proc.visit(this)
    const callExpr = new CallExpression(proc as SymbolLiteral)
    node.params.forEach(param => {
      callExpr.params.push(param.visit(this))
    })

    return callExpr
  },
  visitDefineExpression(node) {
    const ref = node.ref.visit(this)
    const value = node.value.visit(this)

    return new DefineExpression(ref as SymbolLiteral, value)
  },
  visitFuncDefineExpression(node) {
    const func = node.ref.visit(this)
    const params = node.params.visit(this)
    const internalDefs = node.internalDefs.map(def => def.visit(this))
    const value = node.value.visit(this)

    return new FuncDefineExpression(
      func as SymbolLiteral,
      params as ParameterList,
      internalDefs,
      value
    )
  },
  visitIfExpression(node) {
    const test = node.test.visit(this)
    const conseq = node.conseq.visit(this)
    const alt = node.alt.visit(this)

    return new IfExpression(test, conseq, alt)
  },
  visitNumericLiteral(node) {
    return node
  },
  visitProgram(node) {
    const program = new Program()
    node.body.forEach(expr => {
      program.body.push(expr.visit(this))
    })

    return program
  },
  visitSymbolLiteral(node) {
    return node
  },
  visitLambdaExpression(node) {
    const params = node.params.visit(this)
    const body = node.body.visit(this)
    return new LambdaExpression(params as ParameterListNode, body)
  },
}

export default visitor
