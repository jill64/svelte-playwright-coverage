import type { PluginOption } from 'vite'
import { APP_NAME } from '../constants.js'
import { inCoverageMode } from '../utils/inCoverageMode.js'

const name = `vite-plugin-${APP_NAME}`

export const coverage = (): PluginOption =>
  inCoverageMode()
    ? {
        name,
        enforce: 'post',
        config: () => ({
          build: {
            sourcemap: 'inline'
          }
        })
      }
    : null
