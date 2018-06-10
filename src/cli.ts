import meow from 'meow'

const cli = meow(
  `
        Usage
        $ s2j <input>

        Options
        --out-file <outfile>, -o Compile and output to specified path

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
    },
  }
)
