import { preprocess } from '../preprocess/index.js'

export type Context = Awaited<ReturnType<typeof preprocess>>
