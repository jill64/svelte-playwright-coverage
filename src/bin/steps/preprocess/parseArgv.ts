import { parseArgs } from 'node:util'
import { argOptions } from './argOptions.js'
import { splitArgs } from './splitArgs.js'

export const parseArgv = (argv: string[]) => {
  const [, , ...args] = argv

  const { options, commands } = splitArgs(args)

  const {
    values: {
      output = 'coverage/e2e',
      quiet = false,
      debug = false,
      help = false,
      version = false
    }
  } = parseArgs({
    options: argOptions,
    args: options
  })

  const command = commands.join(' ')

  return {
    output,
    command,
    debug,
    quiet,
    help,
    version
  }
}
