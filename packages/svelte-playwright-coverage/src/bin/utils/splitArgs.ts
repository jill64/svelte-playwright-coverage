import { options } from '../options.js'

const flags = Object.entries(options).flatMap(([key, { short, type }]) => [
  {
    flag: '--' + key,
    type
  },
  {
    flag: '-' + short,
    type
  }
])

export const splitArgs = (args: string[]) => {
  const last = args.reduce(
    (prev, curr, index) => {
      const result = flags.find((x) => x.flag === curr)

      return result
        ? {
            index,
            ...result
          }
        : prev
    },
    {
      index: -1,
      flag: '',
      type: '' as 'string' | 'boolean'
    }
  )

  if (!last.flag) {
    return {
      options: [],
      commands: args
    }
  }

  const cmdIndex = last.index + (last.type === 'string' ? 2 : 1)

  const options = args.slice(0, cmdIndex)
  const commands = args.slice(cmdIndex)

  return {
    options,
    commands
  }
}
