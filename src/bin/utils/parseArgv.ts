import { parseArgs } from 'node:util'
import { options } from '../options.js'
import { splitArgs } from './splitArgs.js'

export const parseArgv = (argv: string[]) => {
  const [, , ...args] = argv

  const { options: flags, commands } = splitArgs(args)

  const {
    values: { output, logLevel, help, version }
  } = parseArgs({
    options: options,
    args: flags
  })

  const command = commands.join(' ')

  return {
    output,
    command,
    logLevel,
    help,
    version
  }
}
