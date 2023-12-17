import kleur from 'kleur'
import { cp, rm } from 'node:fs/promises'
import path from 'node:path'
import { CloseReason } from '../../types/CloseReason.js'
import { preprocess } from '../preprocess/index.js'

type Context = Awaited<ReturnType<typeof preprocess>>

export const postprocess = async ({
  context
}: {
  context: Context
  reason: CloseReason
}) => {
  const { logger, tmp, output } = context

  logger.info(kleur.cyan('Converting coverage data...'))

  const outDir = path.join(process.cwd(), output)

  logger.debug(`Copying ${tmp} to ${outDir}`)

  await rm(outDir, {
    recursive: true,
    force: true
  })

  await cp(tmp, path.join(outDir, 'vite', 'raw'), {
    recursive: true,
    force: true
  })

  await rm(tmp, {
    recursive: true,
    force: true
  })

  logger.log(kleur.bold().green('✅ Complete!'))
}
