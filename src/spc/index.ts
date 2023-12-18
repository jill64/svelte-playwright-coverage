import { spawn } from 'node:child_process'
import process from 'node:process'
import v8 from 'node:v8'
import { postprocess } from './steps/postprocess/index.js'
import { preprocess } from './steps/preprocess/index.js'
import { CloseReason } from './types/CloseReason.js'
import { SPCOptions } from './types/SPCOptions.js'

export const spc = async (
  command: string,
  options?: SPCOptions
): Promise<number> => {
  const context = await preprocess(options)

  v8.takeCoverage()

  spawn(command, {
    stdio: 'inherit',
    shell: true
  })

  let closed = false

  return new Promise((resolve) => {
    const close = async (reason: CloseReason) => {
      if (closed) {
        return
      }

      closed = true

      v8.stopCoverage()

      const result = await postprocess({ reason, context })

      resolve(result)
    }

    process.on('beforeExit', close)
    process.on('SIGINT', close)
    process.on('SIGHUP', close)
  })
}
