import path from 'node:path'
import { VITE_RAW_DIR } from '../../../constants.js'
import { getOutDir } from '../../../utils/getOutDir.js'
import { getTmpDir } from '../../../utils/getTmpDir.js'
import { mv } from './utils/mv.js'

export const copyViteCoverage = async () => {
  const dist = path.join(getOutDir(), VITE_RAW_DIR)

  await mv(getTmpDir(), dist)
}
