import { expect, test } from 'vitest'
import { parseArgv } from './parseArgv.js'

test('parseArgv', () => {
  expect(parseArgv(['node', 'src/bin/index.js', 'playwright', 'test'])).toEqual(
    {
      output: undefined,
      command: 'playwright test',
      logLevel: undefined,
      help: undefined,
      version: undefined
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
    logLevel: undefined,
    help: undefined,
    version: undefined
  })

  expect(parseArgv([])).toEqual({
    output: undefined,
    command: '',
    logLevel: undefined,
    help: undefined,
    version: undefined
  })

  expect(
    parseArgv([
      'node',
      'src/bin/index.js',
      '--logLevel',
      'warn',
      'echo',
      'test'
    ])
  ).toEqual({
    output: undefined,
    command: 'echo test',
    logLevel: 'warn',
    help: undefined,
    version: undefined
  })
})
