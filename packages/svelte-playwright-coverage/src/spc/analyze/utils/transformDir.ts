import { mkdir, readdir } from 'node:fs/promises'
import path from 'node:path'
import { transformFile } from './transformFile.js'

export const transformDir = async (
  from: string,
  to: string,
  fn: (source: string, path: string) => string | Promise<string>
) => {
  const [list] = await Promise.all([
    readdir(from, {
      withFileTypes: true,
      recursive: true
    }),
    mkdir(to, {
      recursive: true
    })
  ])

  const result = list
    .filter((dirent) => dirent.isFile())
    .map(async (dirent) => {
      const fromPath = path.join(from, dirent.name)
      const toPath = path.join(to, dirent.name)
      await transformFile(fromPath, toPath, (str) => fn(str, fromPath))
    })

  await Promise.all(result)
}
