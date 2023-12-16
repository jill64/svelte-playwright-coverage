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

const close = async (reason: CloseReason) => {
  v8.stopCoverage()
  await postprocess({ reason, context })
}

process.on('exit', close)
process.on('SIGINT', close)
process.on('SIGHUP', close)
