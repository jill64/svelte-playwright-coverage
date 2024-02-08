import { App } from '@jill64/ts-cli'
import process from 'node:process'
import v8 from 'node:v8'
import { postprocess } from './postprocess/index.js'
import { preprocess } from './preprocess/index.js'
import { run } from './utils/run.js'

export const spc = new App(
  {
    options: {
      output: {
        alias: 'o',
        description: 'Output coverage report',
        type: 'string'
      }
    },
    rest: {
      placeholder: 'command',
      description: 'Playwright test command'
    }
  },
  async ({ options, rest }) => {
    if (!rest?.length) {
      throw new Error('Command is required')
    }

    await preprocess(options?.output)

    const sub = run(rest)

    return new Promise((resolve) => {
      const close = async () => {
        await postprocess()

        resolve()
      }

      sub.once('exit', close)
      process.on('SIGINT', resolve)
      process.on('SIGHUP', resolve)
    })
  }
).add(
  'cover',
  {
    rest: {
      placeholder: 'command',
      description: 'Vite serve command'
    }
  },
  ({ rest }) => {
    if (!rest?.length) {
      throw new Error('Command is required')
    }

    v8.takeCoverage()

    const sub = run(rest)

    return new Promise((resolve) => {
      const close = () => {
        v8.stopCoverage()
        resolve()
      }

      sub.once('exit', close)
      process.on('SIGINT', close)
      process.on('SIGHUP', close)
    })
  }
)
