import { PlaywrightWorkerOptions, test as base } from '@playwright/test'
import kleur from 'kleur'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { RAW_COVERAGE_DIR } from '../constants.js'

const isAvailable = (browserName: PlaywrightWorkerOptions['browserName']) =>
  browserName === 'chromium'

base.beforeEach(async ({ page, browserName }) => {
  if (!isAvailable(browserName)) {
    console.warn(
      kleur.gray(
        `Coverage APIs is not available in ${browserName}. Coverage collection will be skipped.`
      )
    )
    return
  }

  await page.coverage.startJSCoverage({
    reportAnonymousScripts: true
  })
})

base.afterEach(async ({ page, browserName }, { outputDir }) => {
  if (!isAvailable(browserName)) {
    return
  }

  const coverage = await page.coverage.stopJSCoverage()

  const out = path.join(outputDir, RAW_COVERAGE_DIR)

  await mkdir(out, { recursive: true })

  const filename = path.join(out, 'v8-raw.json')

  await writeFile(filename, JSON.stringify(coverage))
})

export { base as test }
