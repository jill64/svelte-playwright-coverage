const options = {
  '-o': {
    option: '--output <dir>',
    description: 'Output directory for coverage files'
  },
  '-l': {
    option: '--logLevel <level>',
    description: 'Set log level (error, warn, info, debug)'
  },
  '-h': {
    option: '--help',
    description: 'Display this message'
  },
  '-v': {
    option: '--version',
    description: 'Display version'
  }
}

const codes = {
  0: 'Success',
  1: 'Unknown Error',
  2: 'No Command Provided',
  10: 'Keyboard Interrupted (SIGINT)',
  11: 'Terminal Killed (SIGHUP)',
  '10X': 'Exit code X from child process'
}

export const helps = `
Usage: spc [options] <command>

Options:
  ${Object.entries(options)
    .map(
      ([short, { option, description }]) =>
        `${short}, ${option.padEnd(20)} ${description}`
    )
    .join('\n  ')}

Return Codes:
  ${Object.entries(codes)
    .map(([code, message]) => `${code.padEnd(4)} ${message}`)
    .join('\n  ')}
`
