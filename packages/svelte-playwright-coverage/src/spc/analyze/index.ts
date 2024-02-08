import { convert } from './convert/index.js'
import { merge } from './merge/index.js'
import { report } from './report/index.js'
import { resolve } from './resolve/index.js'

export const analyze = async () => {
  await resolve()
  await merge()
  await convert()
  await report()
}
