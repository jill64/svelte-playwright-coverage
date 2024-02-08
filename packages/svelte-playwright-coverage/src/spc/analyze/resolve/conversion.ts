import { SourceMap } from 'node:module'
import { PlaywrightV8RawCoverage } from '../../../types/PlaywrightV8RawCoverage.js'
import { ResolvedCoverage } from '../types/ResolvedCoverage.js'

export const conversion = async ({
  coverage
}: {
  coverage: PlaywrightV8RawCoverage[number]
  filepath: string
  sourceMap?: SourceMap | null
}): Promise<ResolvedCoverage | null> => {
  // If not provided sourceMap, try to resolve from coverage/e2e/vite/map

  // TODO: Implement this
  return coverage as ResolvedCoverage
}
