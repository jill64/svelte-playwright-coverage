import { PlaywrightWorkerOptions, test as base } from '@playwright/test'
import kleur from 'kleur'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { inCoverageMode } from '../utils/inCoverageMode.js'

const isAvailable = (browserName: PlaywrightWorkerOptions['browserName']) =>
  browserName === 'chromium'

base.beforeEach(async ({ page, browserName }) => {
  if (!inCoverageMode()) {
    console.debug(kleur.gray('Now in non-coverage mode.'))
    return
  }

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

base.afterEach(async ({ page, browserName }, { testId }) => {
  const outDir = process.env.SVELTE_PLAYWRIGHT_COVERAGE_OUTPUT

  if (!outDir) {
    console.debug(
      kleur.gray(
        'Coverage output directory is not specified. Coverage collection will be skipped.'
      )
    )
    return
  }

  if (!isAvailable(browserName)) {
    return
  }

  const coverage = await page.coverage.stopJSCoverage()

  const out = path.join(outDir, 'playwright', 'raw')

  await mkdir(out, { recursive: true })

  const filename = path.join(out, `${testId}.json`)

  await writeFile(filename, JSON.stringify(coverage))
})

export { base as test }
