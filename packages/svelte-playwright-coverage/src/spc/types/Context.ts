import { preprocess } from '../preprocess.js'

export type Context = Awaited<ReturnType<typeof preprocess>>
