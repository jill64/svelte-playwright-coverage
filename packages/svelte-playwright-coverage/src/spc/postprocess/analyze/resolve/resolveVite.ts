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
    const sourceMapCache = output['source-map-cache']

    const resolve = async (
      coverage: NodeV8RawCoverage['result'][number]
    ): Promise<ResolvedCoverage | null> => {
      const map = sourceMapCache?.[coverage.url]

      if (!map?.data) {
        return null
      }

      /**
       * TODO: Open an issue in `@types/node` if necessary.
       * Documentation, type definitions, and actual data at the following URLs do not match.
       * [node.js implement](https://github.com/nodejs/node/blob/main/lib/internal/source_map/source_map.js)
       */
      const sourceMap = new SourceMap(
        {
          ...map.data,
          file: path.basename(coverage.url)
        },
        // @ts-expect-error - Invalid @types/node
        map.lineLengths
      )

      return await conversion({ coverage, context, filepath, sourceMap })
    }

    const promises = result.map(resolve)
    const resolved = await Promise.all(promises)
    const filtered = resolved.filter(nonNullable)

    return JSON.stringify(filtered)
  }

  await transformDir(from, to, transform)
}
