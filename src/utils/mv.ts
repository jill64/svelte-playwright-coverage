import { cp, rm } from 'node:fs/promises'

export const mv = async (from: string, to: string) => {
  await rm(to, {
    recursive: true,
    force: true
  })

  await cp(from, to, {
    recursive: true,
    force: true
  })

  await rm(from, {
    recursive: true,
    force: true
  })
}
