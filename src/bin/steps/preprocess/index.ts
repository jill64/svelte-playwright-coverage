import kleur from 'kleur'
import packageJson from '../../../../package.json'
import { APP_NAME } from '../../../constants.js'
import { parseArgv } from './parseArgv.js'
import { setTempCoverageDir } from './setTempCoverageDir.js'

const empty = () => {}

export const preprocess = async (argv: string[]) => {
  const { output, command, silent, help, version, verbose } = parseArgv(argv)

  if (help) {
    console.log(`
Usage: spc [options] <command>

Options:
  -o, --output <dir>  Output directory for coverage files
  -s, --silent        Suppress logging
  -V, --verbose       Enable verbose logging
  -h, --help          Display this message
  -v, --version       Display version number
`)
    process.exit(0)
  }

  if (version) {
    console.log('v' + packageJson.version)
    process.exit(0)
  }

  if (!command) {
    throw new Error(
      `No command found. 
Please provide a command to run.
e.g. "spc playwright test"'
`
    )
  }

  const logger = {
    ...console,
    info: silent ? empty : console.info,
    log: silent ? empty : console.log,
    warn: silent ? empty : console.warn,
    debug: verbose ? console.debug : empty
  }

  logger.log(kleur.bold().cyan('☂️ ' + APP_NAME))

  const tmp = await setTempCoverageDir()

  process.env.SVELTE_PLAYWRIGHT_COVERAGE_ENABLE = '1'

  logger.info(kleur.cyan('Measuring coverage...'))

  return {
    command,
    output,
    logger,
    tmp
  }
}
