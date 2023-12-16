import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import process from 'node:process'
import { APP_NAME } from '../../../constants.js'

export const setTempCoverageDir = async () => {
  const prefix = path.join(os.tmpdir(), APP_NAME + '-')
  const dir = await fs.mkdtemp(prefix)

  process.env.NODE_V8_COVERAGE = dir

  return dir
}
