import { parseArgs } from 'node:util'
import { DEFAULT_COVERAGE_FINAL_DIR } from '../../constants.js'
import { argOptions } from './argOptions.js'
import { splitArgs } from './splitArgs.js'

export const parseArgv = (argv: string[]) => {
  const [, , ...args] = argv

  const { options, commands } = splitArgs(args)

  const {
    values: {
      output = DEFAULT_COVERAGE_FINAL_DIR,
      silent = false,
      verbose = false,
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
    verbose,
    silent,
    help,
    version
  }
}
