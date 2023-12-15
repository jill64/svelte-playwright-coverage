import { PlaywrightWorkerOptions, test as base } from '@playwright/test'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const isAvailable = (browserName: PlaywrightWorkerOptions['browserName']) =>
  browserName === 'chromium'

base.beforeEach(async ({ page, browserName }) => {
  if (!isAvailable(browserName)) {
    console.warn(
      `Coverage APIs is not available for ${browserName}. Coverage collection will be skipped.`
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

  const out = path.join(outputDir, 'coverage')

  await mkdir(out, { recursive: true })

  coverage

  // v8ToIstanbul
})

export { base as test }
