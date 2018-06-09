// Helper types
interface Token {
  type: 'paren' | 'number' | 'name'
  value: string
}

const tokenizer = (input: string) => {
  let pos = 0
  const tokens: Token[] = []
  while (pos < input.length) {
    let ch = input[pos]

    if (ch === '(' || ch === ')') {
      tokens.push({
        type: 'paren',
        value: ch,
      })

      pos++
      continue
    }

    const whiteSpaceRe = /\s/
    // skip whitespace
    if (whiteSpaceRe.test(ch)) {
      pos++
      continue
    }

    const numberRe = /[0-9]/
    if (numberRe.test(ch)) {
      let val = ''

      while (numberRe.test(ch)) {
        val += ch
        ch = input[++pos]
      }

      tokens.push({
        type: 'number',
        value: val,
      })

      continue
    }

    const lettersRe = /[a-z]/i
    if (lettersRe.test(ch)) {
      let val = ''

      while (ch !== undefined && lettersRe.test(ch)) {
        val += ch
        ch = input[++pos]
      }

      tokens.push({
        type: 'name',
        value: val,
      })

      continue
    }

    throw new TypeError(`Unknown character: ${ch}`)
  }

  return tokens
}

export default tokenizer