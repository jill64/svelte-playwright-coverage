import { V8Coverage } from '@jill64/v8-resolver'

export const thinning = (x: V8Coverage): boolean =>
  !!x.url && !x.url.includes('/node_modules/') && !x.url.startsWith('node:')
