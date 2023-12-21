import { gen } from '$lib/server/coverage-server-testing-module'

export const load = () => {
  return {
    rand: gen(),
    date: new Date().toISOString()
  }
}
