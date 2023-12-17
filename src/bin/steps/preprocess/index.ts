import kleur from 'kleur'
import path from 'path'
import packageJson from '../../../../package.json'
import { APP_NAME } from '../../../constants.js'
import { helps } from './help.js'
import { parseArgv } from './parseArgv.js'
import { setTempCoverageDir } from './setTempCoverageDir.js'

const empty = () => {}

export const preprocess = async (argv: string[]) => {
  const { output, command, quiet, help, version, debug } = parseArgv(argv)

  const logger = {
    ...console,
    info: quiet ? empty : console.info,
    log: quiet ? empty : console.log,
    warn: quiet ? empty : console.warn,
    debug: !quiet && debug ? console.debug : empty
  }

  if (help) {
    logger.log(helps)
    process.exit(0)
  }

  if (version) {
    logger.log('v' + packageJson.version)
    process.exit(0)
  }

  if (!command) {
    logger.error(kleur.red('No Command Provided'))
    logger.warn(kleur.yellow('Please provide a command to run.'))
    logger.info(kleur.gray('e.g. "spc playwright test"'))
    process.exit(2)
  }

  logger.log(
    kleur.cyan(
      `
--------------------------------------------------------
${kleur.bold(`☂️ ${APP_NAME}`)}
--------------------------------------------------------
`
    )
  )

  const tmp = await setTempCoverageDir()
  const outDir = path.join(process.cwd(), output)

  process.env.SVELTE_PLAYWRIGHT_COVERAGE_OUTPUT = outDir

  logger.log(kleur.cyan('Measuring coverage...'))

  return {
    command,
    outDir,
    logger,
    tmp
  }
}
