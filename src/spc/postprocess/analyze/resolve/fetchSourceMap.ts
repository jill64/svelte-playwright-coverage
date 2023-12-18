import { SourceMap } from 'node:module'

export const fetchSourceMap = async (
  sourceMappingURL: string | undefined,
  sourceRoot: string
) => {
  if (!sourceMappingURL) {
    return null
  }

  try {
    const res = await fetch(sourceMappingURL)

    if (!res?.ok) {
      return null
    }

    const json = (await res.json()) as SourceMap['payload']

    const map = new SourceMap({
      ...json,
      sourceRoot
    })

    if (map.payload.version !== 3) {
      return null
    }

    return map
  } catch {
    return null
  }
}
