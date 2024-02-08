import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import process from 'node:process'
import { APP_NAME } from '../constants.js'

/**
 * Temporary directory for V8 coverage output
 * @see https://nodejs.org/docs/latest/api/cli.html#source-map-cache
 */
export const TmpDir = {
  async generate() {
    // Create a temporary directory name prefix
    const prefix = path.join(os.tmpdir(), APP_NAME + '-')

    // Create a temporary directory
    const tmp = await fs.mkdtemp(prefix)

    process.env.NODE_V8_COVERAGE = tmp
  },
  get() {
    const tmp = process.env.NODE_V8_COVERAGE

    if (!tmp) {
      throw new Error('NODE_V8_COVERAGE is not set')
    }

    return tmp
  }
}
