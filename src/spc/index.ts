import { spawn } from 'node:child_process'
import process from 'node:process'
import v8 from 'node:v8'
import { postprocess } from './postprocess/index.js'
import { preprocess } from './preprocess/index.js'
import { CloseReason } from './types/CloseReason.js'
import { SPCOptions } from './types/SPCOptions.js'

export const spc = async (
  command: string,
  options?: SPCOptions
): Promise<number> => {
  const context = await preprocess(options)

  v8.takeCoverage()

  const sub = spawn(command, {
    stdio: 'inherit',
    shell: true
  })

  return new Promise((resolve) => {
    const close = async (reason: CloseReason) => {
      v8.stopCoverage()

      const result = await postprocess({ reason, context })

      resolve(result)
    }

    sub.once('exit', close)
    process.once('SIGINT', close)
    process.once('SIGHUP', close)
  })
}
