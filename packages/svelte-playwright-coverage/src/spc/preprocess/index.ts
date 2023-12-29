import kleur from 'kleur'
import { rm } from 'node:fs/promises'
import { createLogger } from './createLogger.js'
import { setOutDir } from './setOutDir.js'
import { setTempCoverageDir } from './setTempCoverageDir.js'

export const preprocess = async (options?: {
  output?: string
  verbose?: boolean
  quiet?: boolean
}) => {
  const { output = 'coverage/e2e', verbose, quiet } = options ?? {}

  const outDir = setOutDir(output)
  const logger = createLogger({ verbose, quiet })

  logger.log(
    kleur.cyan(
      `
--------------------------------------------------------
${kleur.bold(`☂️ svelte-playwright-coverage`)}
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
