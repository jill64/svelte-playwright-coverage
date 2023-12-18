import { LogLevel } from '../../../utils/logLevel.js'

const empty = () => {}

export const createLogger = (logLevel?: LogLevel) => ({
  ...console,
  info: logLevel === 'info' || logLevel === 'debug' ? console.info : empty,
  log: logLevel === 'info' || logLevel === 'debug' ? console.log : empty,
  warn: logLevel !== 'error' ? console.warn : empty,
  debug: logLevel === 'debug' ? console.debug : empty
})
