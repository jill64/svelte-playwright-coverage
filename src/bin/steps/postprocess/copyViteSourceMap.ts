import path from 'node:path'
import { Context } from '../../types/Context.js'

export const copyViteSourceMap = async ({ outDir }: Context) => {
  const dist = path.join(outDir, 'vite', 'map')

  // TODO: copy vite source map
  dist
}
