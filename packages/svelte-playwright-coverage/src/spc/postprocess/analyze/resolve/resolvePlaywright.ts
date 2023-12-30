import path from 'node:path'
import {
  PLAYWRIGHT_RAW_DIR,
  PLAYWRIGHT_RESOLVED_DIR
} from '../../../../constants.js'
import { PlaywrightV8RawCoverage } from '../../../../types/PlaywrightV8RawCoverage.js'
import { getOutDir } from '../../../../utils/getOutDir.js'
import { nonNullable } from '../../../../utils/nonNullable.js'
import { Context } from '../../../types/Context.js'
import { ResolvedCoverage } from '../types/ResolvedCoverage.js'
import { transformDir } from '../utils/transformDir.js'
import { conversion } from './conversion.js'
import { fetchSourceMap } from './fetchSourceMap.js'
import { pickSourceMappingURL } from './pickSourceMappingURL.js'

export const resolvePlaywright = async (context: Context) => {
  const outDir = getOutDir()

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
      if (!coverage.source) {
        return null
      }

      const sourceMappingURL = pickSourceMappingURL(coverage.source)
      const sourceMapPayload = await fetchSourceMap(sourceMappingURL)

      if (!sourceMapPayload) {
        return null
      }

      const lineLengths = coverage.source.split('\n').map((line) => line.length)

      const result = await conversion({
        coverage,
        filepath,
        context,
        sourceMapPayload,
        lineLengths
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
