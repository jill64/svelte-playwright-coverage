import kleur from 'kleur'
import { rm } from 'node:fs/promises'
import { APP_NAME } from '../../constants.js'
import { setOutDir } from './setOutDir.js'
import { setTempCoverageDir } from './setTempCoverageDir.js'

export const preprocess = async (output = 'coverage/e2e') => {
  const outDir = setOutDir(output)

  console.log(
    kleur.cyan(
      `
--------------------------------------------------------
${kleur.bold(`☂️ ${APP_NAME}`)}
--------------------------------------------------------
`
    )
  )

  await Promise.all([
    rm(outDir, {
      recursive: true,
      force: true
    }),
    setTempCoverageDir()
  ])

  console.log(kleur.cyan('Measuring coverage...'))
}
