import kleur from 'kleur'
import { rm } from 'node:fs/promises'
import { APP_NAME } from '../../constants.js'
import { SPCOptions } from '../types/SPCOptions.js'
import { createLogger } from './createLogger.js'
import { setOutDir } from './setOutDir.js'
import { setTempCoverageDir } from './setTempCoverageDir.js'

export const preprocess = async (options?: SPCOptions) => {
  const { output = 'coverage/e2e', logLevel } = options ?? {}

  const outDir = setOutDir(output)
  const logger = createLogger(logLevel)

  logger.log(
    kleur.cyan(
      `
--------------------------------------------------------
${kleur.bold(`☂️ ${APP_NAME}`)}
--------------------------------------------------------
`
    )
  )

  await Promise.all([
    rm(outDir, {
      recursive: true,
      force: true
    }),
    setTempCoverageDir()
  ])

  logger.log(kleur.cyan('Measuring coverage...'))

  return {
    logger
  }
}
