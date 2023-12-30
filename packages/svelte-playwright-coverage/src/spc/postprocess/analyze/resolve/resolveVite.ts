import { SourceMapPayload } from 'node:module'
import path from 'node:path'
import { VITE_RAW_DIR, VITE_RESOLVED_DIR } from '../../../../constants.js'
import { NodeV8RawCoverage } from '../../../../types/NodeV8RawCoverage.js'
import { getOutDir } from '../../../../utils/getOutDir.js'
import { nonNullable } from '../../../../utils/nonNullable.js'
import { Context } from '../../../types/Context.js'
import { ResolvedCoverage } from '../types/ResolvedCoverage.js'
import { transformDir } from '../utils/transformDir.js'
import { conversion } from './conversion.js'

export const resolveVite = async (context: Context) => {
  const outDir = getOutDir()

  const from = path.join(outDir, VITE_RAW_DIR)
  const to = path.join(outDir, VITE_RESOLVED_DIR)

  const transform = async (source: string, filepath: string) => {
    const output = JSON.parse(source) as NodeV8RawCoverage
    const { result } = output
    const sourceMapCache = output['source-map-cache']

    const resolve = async (
      coverage: NodeV8RawCoverage['result'][number]
    ): Promise<ResolvedCoverage | null> => {
      const map = sourceMapCache?.[coverage.url]

      if (!map?.data) {
        return null
      }

      const sourceMapPayload: SourceMapPayload = {
        ...map.data,
        file: path.basename(coverage.url)
      }

      const lineLengths = map.lineLengths

      const result = await conversion({
        coverage,
        lineLengths,
        context,
        filepath,
        sourceMapPayload
      })

      return result
    }

    const promises = result.map(resolve)
    const resolved = await Promise.all(promises)
    const filtered = resolved.filter(nonNullable)

    return JSON.stringify(filtered)
  }

  await transformDir(from, to, transform)
}
