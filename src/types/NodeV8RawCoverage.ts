import { PlaywrightV8RawCoverage } from './PlaywrightV8RawCoverage.js'

/**
 * @see https://nodejs.org/docs/latest/api/cli.html#source-map-cache
 */
export type NodeV8RawCoverage = {
  result: PlaywrightV8RawCoverage
  timestamp: number
  /**
   * @see https://nodejs.org/docs/latest/api/cli.html#source-map-cache
   */
  'source-map-cache'?: {
    [absoluteSourcePath: string]: {
      /**
       * Source map URL
       * @example './path-to-map.json'
       */
      url: string

      data: {
        /**
         * Source map version
         * @example 3
         */
        version: number

        /**
         * @example ['file:///absolute/path/to/original.js']
         */
        sources: string[]

        /**
         * @example ['Foo', 'console', 'info']
         */
        names: string[]
        mappings: string

        /**
         * @example './'
         */
        sourceRoot: string
      }
      lineLengths: number[]
    }
  }
}
