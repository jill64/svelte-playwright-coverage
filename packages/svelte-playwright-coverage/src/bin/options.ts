import { ParseArgsConfig } from 'node:util'

export const options = {
  output: {
    type: 'string',
    short: 'o'
  },
  logLevel: {
    type: 'string',
    short: 'l'
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
