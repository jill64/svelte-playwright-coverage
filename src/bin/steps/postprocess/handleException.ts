import { rm } from 'fs/promises'
import { CloseReason } from '../../types/CloseReason.js'
import { Context } from '../../types/Context.js'

export const handleException = async ({
  context,
  reason
}: {
  context: Context
  reason: CloseReason
}) => {
  const { logger, tmp } = context

  const exit = async (code: number) => {
    logger.debug('Cleanup temporary directory...')

    await rm(tmp, {
      recursive: true,
      force: true
    })

    process.exit(code)
  }

  if (reason === 'SIGINT') {
    logger.debug('Received SIGINT')
    await exit(10)
  }

  if (reason === 'SIGHUP') {
    logger.debug('Received SIGHUP')
    await exit(11)
  }

  if (reason !== 0) {
    logger.debug(`Received exit code ${reason}`)
    const code = parseInt(`10${reason}`)
    await exit(code)
  }
}
