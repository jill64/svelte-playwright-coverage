import { ParseArgsConfig } from 'node:util'

export const argOptions = {
  output: {
    type: 'string',
    short: 'o'
  },
  quiet: {
    type: 'boolean',
    short: 'q'
  },
  debug: {
    type: 'boolean',
    short: 'd'
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
