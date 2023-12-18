import { expect, test } from 'vitest'
import { pickSourceMappingURL } from './pickSourceMappingURL.js'

test('pickSourceMappingURL', () => {
  expect(pickSourceMappingURL('')).toBe(undefined)
  expect(pickSourceMappingURL('//# sourceMappingURL=')).toBe('')
  expect(pickSourceMappingURL('//# sourceMappingURL=foo')).toBe('foo')
})
