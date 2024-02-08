import { App } from '@jill64/ts-cli'
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

    return new Promise((resolve) =>
      sub.once('exit', async () => {
        await postprocess()

        resolve()
      })
    )
  }
).add(
  'cover',
  {
    rest: {
      placeholder: 'command',
      description: 'Vite serve command'
    }
  },
  async ({ rest }) => {
    if (!rest?.length) {
      throw new Error('Command is required')
    }

    v8.takeCoverage()

    run(rest)
  }
)
