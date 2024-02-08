import { resolve as resolver } from '@jill64/v8-resolver'
import path from 'node:path'
import { PLAYWRIGHT_RAW_DIR, PLAYWRIGHT_RESOLVED_DIR } from '../../constants.js'
import { OutDir } from '../../utils/OutDir.js'
import { transformDir } from './utils/transformDir.js'

import { VITE_RAW_DIR, VITE_RESOLVED_DIR } from '../../constants.js'

export const vite = async () => {
  const outDir = OutDir.get()

  const from = path.join(outDir, VITE_RAW_DIR)
  const to = path.join(outDir, VITE_RESOLVED_DIR)

  await transformDir(from, to, async (source: string) => {
    const coverage = JSON.parse(source)
    const resolved = await resolver(coverage)
    return JSON.stringify(resolved)
  })
}

const playwright = async () => {
  const outDir = OutDir.get()

  const from = path.join(outDir, PLAYWRIGHT_RAW_DIR)
  const to = path.join(outDir, PLAYWRIGHT_RESOLVED_DIR)

  await transformDir(from, to, async (source: string): Promise<string> => {
    const result = JSON.parse(source)

    const resolved = resolver({
      result,
      timestamp: Date.now(),
      'source-map-cache': {}
    })

    return JSON.stringify(resolved)
  })
}

export const resolve = () => Promise.all([playwright(), vite()])
