import { Page } from '@playwright/test'
import { AwaitedReturn } from './AwaitedReturn.js'

export type PlaywrightV8RawCoverage = AwaitedReturn<
  Page['coverage']['stopJSCoverage']
>
