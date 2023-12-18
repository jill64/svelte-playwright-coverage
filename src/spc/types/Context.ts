import { preprocess } from '../steps/preprocess/index.js'

export type Context = Awaited<ReturnType<typeof preprocess>>
