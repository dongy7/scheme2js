export const isValidOp = (token: string) => {
  return ['+', '-', '*', '/', '<', '>', '<=', '>=', '=='].indexOf(token) >= 0
}
