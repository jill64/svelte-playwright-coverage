import { SourceMapPayload } from 'node:module'
import { pickSourceMappingURL } from './pickSourceMappingURL.js'

export const fetchSourceMap = async (
  source: string | undefined | null,
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

    const json = (await res.json()) as SourceMapPayload

    const map = {
      ...json,
      sourceRoot
    }

    if (map.version !== 3) {
      return null
    }

    return map
  } catch {
    return null
  }
}
