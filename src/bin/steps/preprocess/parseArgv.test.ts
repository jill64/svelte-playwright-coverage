import { expect, test } from 'vitest'
import { DEFAULT_COVERAGE_FINAL_DIR } from '../../constants.js'
import { parseArgv } from './parseArgv.js'

test('parseArgv', () => {
  expect(parseArgv(['node', 'src/bin/index.js', 'playwright', 'test'])).toEqual(
    {
      output: DEFAULT_COVERAGE_FINAL_DIR,
      command: 'playwright test',
      silent: false,
      verbose: false,
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
    silent: false,
    verbose: false,
    help: false,
    version: false
  })

  expect(parseArgv([])).toEqual({
    output: DEFAULT_COVERAGE_FINAL_DIR,
    command: '',
    silent: false,
    verbose: false,
    help: false,
    version: false
  })

  expect(parseArgv(['node', 'src/bin/index.js', '-s', 'echo', 'test'])).toEqual(
    {
      output: DEFAULT_COVERAGE_FINAL_DIR,
      command: 'echo test',
      silent: true,
      verbose: false,
      help: false,
      version: false
    }
  )
})
