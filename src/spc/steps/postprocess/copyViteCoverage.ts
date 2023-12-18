import path from 'node:path'
import { Context } from '../../types/Context.js'
import { mv } from './utils/mv.js'

export const copyViteCoverage = async ({ tmp, outDir }: Context) => {
  const dist = path.join(outDir, 'vite', 'raw')
  await mv(tmp, dist)
}
