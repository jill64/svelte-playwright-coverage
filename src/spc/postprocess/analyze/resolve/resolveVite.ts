import path from 'node:path'
import process from 'node:process'
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
    const { result } = JSON.parse(source) as NodeV8RawCoverage

    const resolve = async (
      coverage: NodeV8RawCoverage['result'][number]
    ): Promise<ResolvedCoverage | null> => {
      // Exclude native node modules
      if (coverage.url.startsWith('node:')) {
        return null
      }

      // Exclude out of project directory
      if (!coverage.url.startsWith('file://' + process.cwd())) {
        return null
      }

      // Exclude node_modules
      if (coverage.url.includes('node_modules')) {
        return null
      }

      return await conversion({ coverage, context, filepath })
    }

    const promises = result.map(resolve)
    const resolved = await Promise.all(promises)
    const filtered = resolved.filter(nonNullable)

    return JSON.stringify(filtered)
  }

  await transformDir(from, to, transform)
}
