import { SourceMapPayload } from 'module'
import { PlaywrightV8RawCoverage } from './PlaywrightV8RawCoverage.js'

/**
 * @see https://nodejs.org/docs/latest/api/cli.html#source-map-cache
 */
export type NodeV8RawCoverage = {
  result: PlaywrightV8RawCoverage
  timestamp: number
  'source-map-cache'?: {
    [absoluteSourcePath: string]: {
      url: string
      data: SourceMapPayload
      lineLengths: number[]
    }
  }
}
