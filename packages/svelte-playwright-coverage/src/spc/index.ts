import { App } from '@jill64/ts-cli'
import { spawn } from 'node:child_process'
import v8 from 'node:v8'
import { postprocess } from './postprocess/index.js'
import { preprocess } from './preprocess/index.js'

const trimCommand = (rest?: string[]) => {
  const command = rest?.join(' ').trim()

  if (!command) {
    throw new Error('No command provided')
  }

  return command
}

export const spc = new App(
  {
    options: {
      output: {
        alias: 'o',
        type: 'string',
        description: 'Coverage Output Directory'
      },
      quiet: {
        alias: 'q',
        description: 'Disable logging'
      },
      verbose: {
        alias: 'V',
        description: 'Enable verbose logging'
      }
    },
    rest: {
      placeholder: 'command',
      description: 'Command to run'
    }
  },
  async ({ options, rest }) => {
    const command = trimCommand(rest)
    const context = await preprocess(options)

    const sub = spawn(command, {
      stdio: 'inherit',
      shell: true
    })

    return new Promise((resolve) => {
      sub.once('exit', async () => {
        await postprocess(context)
        resolve()
      })
    })
  }
).add(
  'cover',
  {
    rest: {
      placeholder: 'command',
      description: 'V8 Coverage Measurement Target Command'
    }
  },
  ({ rest }) => {
    const command = trimCommand(rest)

    v8.takeCoverage()

    const sub = spawn(command, {
      stdio: 'inherit',
      shell: true
    })

    sub.once('exit', () => {
      v8.stopCoverage()
    })
  }
)
