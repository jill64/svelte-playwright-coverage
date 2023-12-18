import { Context } from '../../../types/Context.js'
import { convert } from './convert/index.js'
import { merge } from './merge/index.js'
import { resolve } from './resolve/index.js'
import { write } from './write/index.js'

export const analyze = async (context: Context) => {
  const resolved = await resolve(context)
  const merged = await merge(context, resolved)
  const converted = await convert(context, merged)
  await write(context, converted)
}
