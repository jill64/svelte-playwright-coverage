import { Spinner } from 'cli-spinner'
import kleur from 'kleur'
import { getOutDir } from '../../utils/getOutDir.js'
import { getTmpDir } from '../../utils/getTmpDir.js'
import { analyze } from './analyze/index.js'
import { copyViteCoverage } from './copyViteCoverage.js'

export const postprocess = async () => {
  console.debug(`tmpDir: ${getTmpDir()}`)
  console.debug(`outDir: ${getOutDir()}\n`)

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
