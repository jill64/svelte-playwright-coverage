import { rm } from 'fs/promises'
import { CloseReason } from '../../types/CloseReason.js'
import { Context } from '../../types/Context.js'

export const handleException = async ({
  context,
  reason
}: {
  context: Context
  reason: CloseReason
}): Promise<number> => {
  const { logger, tmp } = context

  if (reason === 0) {
    return 0
  }

  logger.debugS('\nCleanup temporary directory...')

  await rm(tmp, {
    recursive: true,
    force: true
  })

  if (reason === 'SIGINT') {
    logger.debugS('Received SIGINT')
    return 10
  }

  if (reason === 'SIGHUP') {
    logger.debugS('Received SIGHUP')
    return 11
  }

  logger.debugS(`Received exit code ${reason}`)

  const code = parseInt(`10${reason}`)

  return code
}
