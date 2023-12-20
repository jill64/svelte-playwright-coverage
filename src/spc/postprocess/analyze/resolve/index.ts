import { Context } from '../../../types/Context.js'
import { resolvePlaywright } from './resolvePlaywright.js'
import { resolveVite } from './resolveVite.js'

export const resolve = async (context: Context) => {
  await Promise.all([resolvePlaywright(context), resolveVite(context)])
}
