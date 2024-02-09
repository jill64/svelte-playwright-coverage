import kleur from 'kleur'
import { APP_NAME } from '../constants.js'
import { OutDir } from '../utils/OutDir.js'
import { TmpDir } from '../utils/TmpDir.js'

export const preprocess = async (output = 'coverage/e2e') => {
  console.log(
    kleur.cyan(
      `
--------------------------------------------------------
${kleur.bold(`☂️ ${APP_NAME}`)}
--------------------------------------------------------
`
    )
  )

  await Promise.all([TmpDir.generate(), OutDir.set(output)])

  console.log(kleur.cyan('Measuring coverage...'))
}