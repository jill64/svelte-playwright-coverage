export const logLevel = ['error', 'warn', 'info', 'debug'] as const
export type LogLevel = (typeof logLevel)[number]
export const isLogLevel = (str: string): str is LogLevel =>
  (logLevel as Readonly<string[]>).includes(str)
