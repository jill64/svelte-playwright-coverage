import kleur from 'kleur'
import { CloseReason } from '../../types/CloseReason.js'
import { preprocess } from '../preprocess/index.js'
import { copyViteCoverage } from './copyViteCoverage.js'
import { handleException } from './handleException.js'

type Context = Awaited<ReturnType<typeof preprocess>>

export const postprocess = async ({
  context,
  reason
}: {
  context: Context
  reason: CloseReason
}) => {
  const { logger, outDir } = context

  await handleException({ context, reason })

  logger.info(kleur.cyan('Converting coverage data...'))

  logger.debug(`outDir : ${outDir}`)

  await copyViteCoverage(context)

  logger.log(kleur.bold().green('✅ Complete!'))
}
