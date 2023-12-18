import { readFile, writeFile } from 'fs/promises'

export const transformFile = async (
  from: string,
  to: string,
  fn: (source: string) => string
) => {
  const source = await readFile(from, 'utf-8')
  const transformed = fn(source)
  await writeFile(to, transformed)
}
