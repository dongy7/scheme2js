export const isValidOp = (token: string) => {
  return ['+', '-', '*', '/', '<', '>', '<=', '>=', '='].indexOf(token) >= 0
}

export const isBooleanOp = (token: string) => {
  return ['and', 'or', 'not'].indexOf(token) >= 0
}

const indentation = '  '

export const indentLines = (code: string) => {
  return code
    .split('\n')
    .map(line => indentation + line)
    .join('\n')
}
