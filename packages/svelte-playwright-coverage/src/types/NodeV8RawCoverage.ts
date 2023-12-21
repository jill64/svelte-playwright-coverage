import { SourceMapPayload } from 'node:module'
import { PlaywrightV8RawCoverage } from './PlaywrightV8RawCoverage.js'

/**
 * **TODO**: Open an issue in `@types/node` if necessary.
 * Documentation, type definitions, and actual data at the following URLs do not match.
 * [node.js Source map cache](https://nodejs.org/docs/latest/api/cli.html#source-map-cache)
 */
export type NodeV8RawCoverage = {
  result: PlaywrightV8RawCoverage
  timestamp: number
  'source-map-cache'?: {
    [absoluteSourcePath: string]: {
      /**
       * Source map URL
       * @example './path-to-map.json'
       */
      url: string

      /**
       * The actual coverage data may be empty.
       * Actual coverage data has `sourcesContent`.
       */
      data?: Omit<SourceMapPayload, 'file'> | null
      lineLengths: number[]
    }
  }
}
