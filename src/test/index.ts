import { test as base } from '@playwright/test'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const test = base.extend({
  page: async ({ page }, use, { outputDir }) => {
    await page.coverage.startJSCoverage()

    await use(page)

    const coverage = await page.coverage.stopJSCoverage()

    const out = path.join(outputDir, 'coverage')

    await mkdir(out, { recursive: true })
    await writeFile(path.join(out, 'v8-raw.json'), JSON.stringify(coverage))
  }
})

const { expect } = test

export { expect, test }
