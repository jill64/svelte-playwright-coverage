import { expect, test } from 'vitest'
import { splitArgs } from './splitArgs.js'

test('splitArgs', () => {
  expect(splitArgs(['playwright', 'test'])).toEqual({
    options: [],
    commands: ['playwright', 'test']
  })

  expect(splitArgs(['--output', 'coverage', 'playwright', 'test'])).toEqual({
    options: ['--output', 'coverage'],
    commands: ['playwright', 'test']
  })

  expect(splitArgs(['-v'])).toEqual({
    options: ['-v'],
    commands: []
  })

  expect(splitArgs(['-s', 'echo', 'test'])).toEqual({
    options: ['-s'],
    commands: ['echo', 'test']
  })
})
