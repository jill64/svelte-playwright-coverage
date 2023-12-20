import { Context } from '../../types/Context.js'
import { convert } from './convert/index.js'
import { merge } from './merge/index.js'
import { report } from './report/index.js'
import { resolve } from './resolve/index.js'

export const analyze = async (context: Context) => {
  await resolve(context)
  await merge(context)
  await convert(context)
  await report(context)
}
