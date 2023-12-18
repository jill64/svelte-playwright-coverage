import { AwaitedReturn } from '../../types/AwaitedReturn.js'
import { preprocess } from '../steps/preprocess/index.js'

export type Context = AwaitedReturn<typeof preprocess>
