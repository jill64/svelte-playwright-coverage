import { SourceMapPayload } from 'node:module'
import { PlaywrightV8RawCoverage } from '../../../types/PlaywrightV8RawCoverage.js'
import { ResolvedCoverage } from '../types/ResolvedCoverage.js'

export const conversion = async ({
  coverage,
  sourceMap
}: {
  coverage: PlaywrightV8RawCoverage[number]
  filepath: string
  sourceMap: SourceMapPayload
}): Promise<ResolvedCoverage> => {
  // TODO: Implement this
  return { ...coverage, sourceMap } as ResolvedCoverage
}
