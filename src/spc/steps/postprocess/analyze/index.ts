import { Context } from '../../../types/Context.js'
import { convert } from './convert.js'
import { merge } from './marge.js'
import { resolve } from './resolve.js'
import { write } from './write.js'

export const analyze = async (context: Context) => {
  const resolved = await resolve(context)
  const merged = await merge(context, resolved)
  const converted = await convert(context, merged)
  await write(context, converted)
}
