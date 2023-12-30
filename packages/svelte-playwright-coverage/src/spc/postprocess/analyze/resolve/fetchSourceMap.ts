import { SourceMapPayload } from 'node:module'

export const fetchSourceMap = async (
  sourceMappingURL: string | undefined
): Promise<SourceMapPayload | null> => {
  if (!sourceMappingURL) {
    return null
  }

  try {
    const res = await fetch(sourceMappingURL)

    if (!res?.ok) {
      return null
    }

    const json = (await res.json()) as SourceMapPayload

    if (json.version !== 3) {
      return null
    }

    return json
  } catch {
    return null
  }
}
