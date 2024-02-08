import { readFile } from "node:fs/promises"

export const fetchSource = async (url: string) => {
  try {
    const source = await readFile(new URL(url), 'utf-8')
    
    return source
  } catch {
    return null
  }
}
