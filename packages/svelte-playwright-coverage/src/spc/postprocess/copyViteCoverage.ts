import path from 'node:path'
import { VITE_RAW_DIR } from '../../constants.js'
import { mv } from '../../utils/mv.js'
import { OutDir } from '../../utils/OutDir.js'

export const copyViteCoverage = async () => {
  const dist = path.join(OutDir.get(), VITE_RAW_DIR)

  await mv(OutDir.get(), dist)
}
