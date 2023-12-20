import kleur from 'kleur'
import { LogLevel } from '../../utils/logLevel.js'

const set = (term: unknown, fn: (str: string) => unknown) =>
  term ? fn : () => {}

export const createLogger = (logLevel?: LogLevel) => {
  const allowInfo = logLevel === 'info' || logLevel === 'debug'
  const allowWarn = logLevel !== 'error'
  const allowDebug = logLevel === 'debug'

  return {
    ...console,

    info: set(allowInfo, console.info),

    /** **S**tyled **S**tring info log */
    infoS: set(allowInfo, (str: string) => console.info(kleur.blue(str))),

    log: set(allowInfo, console.log),

    warn: set(allowWarn, console.warn),

    /** **S**tyled **S**tring warn log */
    warnS: set(allowWarn, (str: string) =>
      console.warn(kleur.bold().yellow(str))
    ),

    debug: set(allowDebug, console.debug),

    /** **S**tyled **S**tring debug log */
    debugS: set(allowDebug, (str: string) => console.debug(kleur.gray(str)))
  }
}
