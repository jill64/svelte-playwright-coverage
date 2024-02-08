import { SourceMap } from 'node:module'
import { pickSourceMappingURL } from './pickSourceMappingURL.js'

export const fetchSourceMap = async (
  source: string | undefined,
  sourceRoot: string
) => {
  const sourceMappingURL = pickSourceMappingURL(source)

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
