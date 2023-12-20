import { readFile, writeFile } from 'node:fs/promises'

export const transformFile = async (
  from: string,
  to: string,
  fn: (source: string) => string | Promise<string>
) => {
  const source = await readFile(from, 'utf-8')

  const dist = await fn(source)

  await writeFile(to, dist)
}
