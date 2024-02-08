import { fetchSource } from './fetchSource.js'
import { fetchSourceMap } from './fetchSourceMap.js'

export const deepFetchSourceMap = async (url: string) => {
  if (!url || url.includes('/node_modules/') || url.startsWith('node:')) {
    return null
  }

  const source = await fetchSource(url)

  if (!source) {
    return null
  }

  const sourceMap = await fetchSourceMap(source, url)

  return sourceMap
}
