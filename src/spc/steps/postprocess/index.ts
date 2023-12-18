import { Spinner } from 'cli-spinner'
import kleur from 'kleur'
import { CloseReason } from '../../types/CloseReason.js'
import { Context } from '../../types/Context.js'
import { analyze } from './analyze/index.js'
import { copyViteCoverage } from './copyViteCoverage.js'
import { handleException } from './handleException.js'

export const postprocess = async ({
  context,
  reason
}: {
  context: Context
  reason: CloseReason
}): Promise<number> => {
  const { logger, outDir } = context

  const errorCode = await handleException({ context, reason })

  if (errorCode) {
    return errorCode
  }

  logger.debugS(`outDir: ${outDir}\n`)

  const spinner = new Spinner(kleur.cyan('Analyzing...'))

  spinner.start()

  await copyViteCoverage(context)

  try {
    await analyze(context)

    logger.log(kleur.bold().green('✅ Complete!\n'))

    return 0
  } catch (e) {
    logger.error(e)
    return 1
  } finally {
    spinner.stop(true)
  }
}
