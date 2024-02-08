import { resolvePlaywright } from './resolvePlaywright.js'
import { resolveVite } from './resolveVite.js'

export const resolve = async () => {
  await Promise.all([resolvePlaywright(), resolveVite()])
}
