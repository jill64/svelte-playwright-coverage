import { PlaywrightWorkerOptions, test as base } from '@playwright/test'
import kleur from 'kleur'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { PLAYWRIGHT_RAW_DIR } from '../constants.js'
import { inCoverageMode } from '../utils/inCoverageMode.js'
import { OutDir } from '../utils/OutDir.js'

const isAvailable = (browserName: PlaywrightWorkerOptions['browserName']) =>
  browserName === 'chromium'

// Disable native coverage in Playwright
/**
 * @see https://nodejs.org/docs/latest/api/cli.html#source-map-cache
 */
process.env.NODE_V8_COVERAGE = ''

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
  if (!inCoverageMode() || !isAvailable(browserName)) {
    return
  }

  const coverage = await page.coverage.stopJSCoverage()

  const out = path.join(OutDir.get(), PLAYWRIGHT_RAW_DIR)

  await mkdir(out, { recursive: true })

  const filename = path.join(out, `${testId}.json`)

  await writeFile(filename, JSON.stringify(coverage))
})

export { base as test }
