import { SourceMap, SourceMapPayload } from 'node:module'
import { PlaywrightV8RawCoverage } from '../../../../types/PlaywrightV8RawCoverage.js'
import { Context } from '../../../types/Context.js'
import { ResolvedCoverage } from '../types/ResolvedCoverage.js'

type Position = {
  line: number
  column: number
}

export const conversion = async ({
  coverage,
  context: { logger },
  sourceMapPayload,
  lineLengths
}: {
  coverage: PlaywrightV8RawCoverage[number]
  filepath: string
  context: Context
  sourceMapPayload: SourceMapPayload
  lineLengths: number[]
}): Promise<ResolvedCoverage | null> => {
  // TODO: Implement this

  /**
   * TODO: Open an issue in `@types/node` if necessary.
   * Documentation, type definitions, and actual data at the following URLs do not match.
   * [node.js implement](https://github.com/nodejs/node/blob/main/lib/internal/source_map/source_map.js)
   */
  const sourceMap = new SourceMap(
    sourceMapPayload,
    // @ts-expect-error - Invalid @types/node
    lineLengths
  )

  const convertOffset = (offset: number): Position =>
    lineLengths.reduce(
      ({ sum, line, column }, curr, index) =>
        sum >= offset
          ? {
              sum,
              line,
              column
            }
          : {
              sum: sum + curr + 1,
              line: index,
              column: sum - offset
            },
      {
        sum: 0,
        line: 0,
        column: 0
      }
    )

  const revertOffset = ({ line, column }: Position): number =>
    lineLengths.slice(0, line).reduce((sum, curr) => sum + curr + 1, 0) + column

  const converted = coverage.functions.flatMap((fn) => {
    const ranges = fn.ranges.map((range) => {
      const { count } = range

      const start = convertOffset(range.startOffset)
      const end = convertOffset(range.endOffset)

      const startEntry = sourceMap.findEntry(start.line, start.column)
      const endEntry = sourceMap.findEntry(end.line, end.column)

      const startOffset = revertOffset({
        line: startEntry.originalLine,
        column: startEntry.originalColumn
      })

      const endOffset = revertOffset({
        line: endEntry.originalLine,
        column: endEntry.originalColumn
      })

      return {
        startOffset,
        endOffset,
        count
      }
    })

    return {
      ...fn,
      ranges
    }
  })

  return {
    ...coverage,
    lineLengths,
    sourceMapPayload: sourceMap.payload,
    converted
  } as ResolvedCoverage
}
