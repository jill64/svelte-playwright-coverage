import path from 'node:path'
import { VITE_RAW_DIR, VITE_RESOLVED_DIR } from '../../../constants.js'
import { NodeV8RawCoverage } from '../../../types/NodeV8RawCoverage.js'
import { OutDir } from '../../../utils/OutDir.js'
import { nonNullable } from '../../../utils/nonNullable.js'
import { transformDir } from '../utils/transformDir.js'
import { conversion } from './conversion.js'
import { deepFetchSourceMap } from './deepFetchSourceMap.js'

export const resolveVite = async () => {
  const outDir = OutDir.get()

  const from = path.join(outDir, VITE_RAW_DIR)
  const to = path.join(outDir, VITE_RESOLVED_DIR)

  const transform = async (source: string, filepath: string) => {
    const { result, 'source-map-cache': sourceMapCache } = JSON.parse(
      source
    ) as NodeV8RawCoverage

    const promises = result.map(async (coverage) => {
      const sourceMap =
        sourceMapCache?.[coverage.url]?.data ??
        (await deepFetchSourceMap(coverage.url))

      if (!sourceMap) {
        return null
      }

      const result = await conversion({
        coverage,
        filepath,
        sourceMap
      })

      return result
    })

    const resolved = await Promise.all(promises)
    const filtered = resolved.filter(nonNullable)

    return JSON.stringify(filtered)
  }

  await transformDir(from, to, transform)
}
