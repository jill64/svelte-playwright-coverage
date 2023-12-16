import { Page } from '@playwright/test'

export type PlaywrightV8RawCoverage = Awaited<
  ReturnType<Page['coverage']['stopJSCoverage']>
>
