import { Spinner } from 'cli-spinner'
import kleur from 'kleur'
import { OutDir } from '../../utils/OutDir.js'
import { TmpDir } from '../../utils/TmpDir.js'
import { analyze } from './analyze/index.js'
import { copyViteCoverage } from './copyViteCoverage.js'

export const postprocess = async () => {
  console.debug(`tmpDir: ${TmpDir.get()}`)
  console.debug(`outDir: ${OutDir.get()}\n`)

  const spinner = new Spinner(kleur.cyan('Analyzing...'))

  spinner.start()

  await copyViteCoverage()

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
