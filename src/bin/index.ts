import { spawn } from 'node:child_process'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import process from 'node:process'
import v8 from 'node:v8'

const [, , ...args] = process.argv

const dir = await fs.mkdtemp(
  path.join(os.tmpdir(), 'svelte-playwright-coverage-')
)

process.env.NODE_V8_COVERAGE = dir

v8.takeCoverage()

spawn(args.join(' '), {
  stdio: 'inherit',
  shell: true
})

const close = async () => {
  v8.stopCoverage()
  await fs.rm(dir, {
    recursive: true, force: true
  })
}

process.on('exit', close)
process.on('SIGINT', close)
process.on('SIGHUP', close)
