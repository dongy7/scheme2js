#!/usr/bin/env node
import * as meow from 'meow'
import * as fs from 'fs'
import compile from './index'

const cli = meow(
  `
        Usage
        $ s2j <input>

        Options
        --out-file <outfile>, -o Compile and output to specified path
        --pairs, -p              Include pairs polyfill

        Examples
          $ s2j script.scm
          $ s2j script.scm --out-file script.js
`,
  {
    flags: {
      'out-file': {
        type: 'string',
        alias: 'o',
      },
      pairs: {
        type: 'boolean',
        alias: 'p',
      },
    },
  }
)

if (cli.input.length === 0) {
  console.error('Specify input file path')
  process.exit(1)
}

const srcPath = cli.input[0]
const outPath = cli.flags.o
const code = fs.readFileSync(srcPath, 'utf8')
let output = compile(code)

if (cli.flags.p) {
  const pairsPolyfill = fs.readFileSync('polyfills/pairs.js', 'utf8')
  output = pairsPolyfill + output
}

if (outPath !== undefined) {
  fs.writeFileSync(outPath, output)
} else {
  console.log(output)
}
