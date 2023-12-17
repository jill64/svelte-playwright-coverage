import { spawn } from 'node:child_process'
import process from 'node:process'
import v8 from 'node:v8'
import { postprocess } from './steps/postprocess/index.js'
import { preprocess } from './steps/preprocess/index.js'
import { CloseReason } from './types/CloseReason.js'

const context = await preprocess(process.argv)

v8.takeCoverage()

spawn(context.command, {
  stdio: 'inherit',
  shell: true
})

let fired = false

const close = async (reason: CloseReason) => {
  if (fired) {
    return
  }

  fired = true

  v8.stopCoverage()

  await postprocess({ reason, context })
}

process.on('beforeExit', close)
process.on('SIGINT', close)
process.on('SIGHUP', close)
