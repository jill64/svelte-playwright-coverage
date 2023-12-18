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
  const { logger } = context

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
      const log = (msg: string) => {
        logger.debugS(`[${filepath} - scriptId: ${coverage.scriptId}] ${msg}`)
        return null
      }

      if (coverage.source === undefined) {
        // Basically, this line should not be executed.
        return log('Not found source')
      }

      const sourceMappingURL = pickSourceMappingURL(coverage.source)
      const sourceMap = await fetchSourceMap(sourceMappingURL, coverage.url)

      const result = await conversion({
        coverage,
        filepath,
        context,
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
