import { expect, test } from 'vitest'
import { parseArgv } from './parseArgv.js'

test('parseArgv', () => {
  expect(parseArgv(['node', 'src/bin/index.js', 'playwright', 'test'])).toEqual(
    {
      output: 'coverage/e2e',
      command: 'playwright test',
      quiet: false,
      debug: false,
      help: false,
      version: false
    }
  )

  expect(
    parseArgv([
      'node',
      'src/bin/index.js',
      '--output',
      'coverage',
      'playwright',
      'test'
    ])
  ).toEqual({
    output: 'coverage',
    command: 'playwright test',
    quiet: false,
    debug: false,
    help: false,
    version: false
  })

  expect(parseArgv([])).toEqual({
    output: 'coverage/e2e',
    command: '',
    quiet: false,
    debug: false,
    help: false,
    version: false
  })

  expect(parseArgv(['node', 'src/bin/index.js', '-s', 'echo', 'test'])).toEqual(
    {
      output: 'coverage/e2e',
      command: 'echo test',
      quiet: false,
      debug: false,
      help: false,
      version: false
    }
  )
})
