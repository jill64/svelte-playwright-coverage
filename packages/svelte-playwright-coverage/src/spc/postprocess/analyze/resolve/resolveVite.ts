import { attempt } from '@jill64/attempt'
import { readFile } from 'node:fs/promises'
import { SourceMap } from 'node:module'
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
    const sourceMapCache = output['source-map-cache'] ?? {}

    const resolve = async (
      coverage: NodeV8RawCoverage['result'][number]
    ): Promise<ResolvedCoverage | null> => {
      const sourceMapData = sourceMapCache?.[coverage.url]?.data

      if (!sourceMapData) {
        return null
      }

      const file = path.basename(coverage.url)

      const sourcesContent = await Promise.all(
        sourceMapData.sources.map((source) =>
          attempt(() => readFile(source, 'utf-8'), '')
        )
      )

      const sourceMap = new SourceMap({
        ...sourceMapData,
        file,
        sourcesContent
      })

      return await conversion({ coverage, context, filepath, sourceMap })
    }

    const promises = result.map(resolve)
    const resolved = await Promise.all(promises)
    const filtered = resolved.filter(nonNullable)

    return JSON.stringify(filtered)
  }

  await transformDir(from, to, transform)
}
