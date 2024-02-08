import path from 'node:path'
import {
  PLAYWRIGHT_RAW_DIR,
  PLAYWRIGHT_RESOLVED_DIR
} from '../../../constants.js'
import { PlaywrightV8RawCoverage } from '../../../types/PlaywrightV8RawCoverage.js'
import { OutDir } from '../../../utils/OutDir.js'
import { nonNullable } from '../../../utils/nonNullable.js'
import { ResolvedCoverage } from '../types/ResolvedCoverage.js'
import { transformDir } from '../utils/transformDir.js'
import { conversion } from './conversion.js'
import { fetchSourceMap } from './fetchSourceMap.js'

export const resolvePlaywright = async () => {
  const outDir = OutDir.get()

  const from = path.join(outDir, PLAYWRIGHT_RAW_DIR)
  const to = path.join(outDir, PLAYWRIGHT_RESOLVED_DIR)

  const transform = async (
    source: string,
    filepath: string
  ): Promise<string> => {
    const file = JSON.parse(source) as PlaywrightV8RawCoverage

    const resolve = async (
      coverage: PlaywrightV8RawCoverage[number]
    ): Promise<ResolvedCoverage | null> => {
      const sourceMap = await fetchSourceMap(coverage.source, coverage.url)

      if (!sourceMap) {
        return null
      }

      const result = await conversion({
        coverage,
        filepath,
        sourceMap
      })

      return result
    }

    const promises = file.map(resolve)
    const resolved = await Promise.all(promises)
    const result = resolved.filter(nonNullable)

    return JSON.stringify(result)
  }

  await transformDir(from, to, transform)
}
