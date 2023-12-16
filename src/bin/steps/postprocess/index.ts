import kleur from 'kleur'
import fs from 'node:fs/promises'
import { CloseReason } from '../../types/CloseReason.js'
import { preprocess } from '../preprocess/index.js'

type Context = Awaited<ReturnType<typeof preprocess>>

export const postprocess = async ({
  context
}: {
  context: Context
  reason: CloseReason
}) => {
  const { logger, tmp } = context

  logger.info(kleur.cyan('Converting coverage data...'))

  await fs.rm(tmp, {
    recursive: true,
    force: true
  })

  logger.log(kleur.bold().green('✅ Complete!'))
}
