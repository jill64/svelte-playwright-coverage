import kleur from 'kleur'

const set = (term: unknown, fn: (str: string) => unknown) =>
  term ? fn : () => {}

export const createLogger = ({
  quiet,
  verbose
}: {
  quiet?: boolean
  verbose?: boolean
}) => ({
  ...console,

  info: set(!quiet, console.info),

  /** **S**tyled **S**tring info log */
  infoS: set(!quiet, (str: string) => console.info(kleur.blue(str))),

  log: set(!quiet, console.log),

  warn: set(!quiet, console.warn),

  /** **S**tyled **S**tring warn log */
  warnS: set(!quiet, (str: string) => console.warn(kleur.bold().yellow(str))),

  debug: set(verbose, console.debug),

  /** **S**tyled **S**tring debug log */
  debugS: set(verbose, (str: string) => console.debug(kleur.gray(str)))
})
