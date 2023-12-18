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

    spinner.stop(true)

    logger.log(
      kleur.bold().green('✅ Coverage measurements have been completed.\n')
    )

    return 0
  } catch (e) {
    spinner.stop(true)

    logger.error(e)
    logger.error(
      kleur.bold().red('❌ Coverage measurements have been failed.\n')
    )

    return 1
  }
}
