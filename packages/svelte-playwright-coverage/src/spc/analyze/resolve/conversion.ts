import { SourceMap } from 'node:module'
import { PlaywrightV8RawCoverage } from '../../../types/PlaywrightV8RawCoverage.js'
import { ResolvedCoverage } from '../types/ResolvedCoverage.js'

export const conversion = async ({
  coverage
}: {
  coverage: PlaywrightV8RawCoverage[number]
  filepath: string
  sourceMap: SourceMap
}): Promise<ResolvedCoverage> => {
  // TODO: Implement this
  return coverage as ResolvedCoverage
}
