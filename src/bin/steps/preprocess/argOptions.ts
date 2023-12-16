import { ParseArgsConfig } from 'node:util'

export const argOptions = {
  output: {
    type: 'string',
    short: 'o'
  },
  silent: {
    type: 'boolean',
    short: 's'
  },
  verbose: {
    type: 'boolean',
    short: 'V'
  },
  help: {
    type: 'boolean',
    short: 'h'
  },
  version: {
    type: 'boolean',
    short: 'v'
  }
} satisfies ParseArgsConfig['options']
