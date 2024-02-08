import { Spinner } from 'cli-spinner'
import kleur from 'kleur'
import path from 'node:path'
import { VITE_RAW_DIR } from '../constants.js'
import { OutDir } from '../utils/OutDir.js'
import { TmpDir } from '../utils/TmpDir.js'
import { mv } from '../utils/mv.js'
import { analyze } from './analyze/index.js'

export const postprocess = async () => {
  console.debug(`tmpDir: ${TmpDir.get()}`)
  console.debug(`outDir: ${OutDir.get()}\n`)

  const spinner = new Spinner(kleur.cyan('Analyzing...'))

  spinner.start()

  // Copy Vite coverage to the dist directory
  const dist = path.join(OutDir.get(), VITE_RAW_DIR)
  await mv(TmpDir.get(), dist)

  try {
    await analyze()

    spinner.stop(true)

    console.log(
      kleur.bold().green('✅ Coverage measurements have been completed.\n')
    )
  } catch (e) {
    spinner.stop(true)

    console.error(e)
    console.error(
      kleur.bold().red('❌ Coverage measurements have been failed.\n')
    )
  }
}
