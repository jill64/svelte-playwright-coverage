import type { PluginOption } from 'vite'

import { inCoverageMode } from '../utils/inCoverageMode.js'

export const coverage = (): PluginOption =>
  inCoverageMode()
    ? {
        name: 'vite-plugin-svelte-playwright-coverage',
        enforce: 'post',
        config: () => ({
          build: {
            sourcemap: 'inline'
          }
        })
      }
    : null
