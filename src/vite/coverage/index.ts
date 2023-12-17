import type { PluginOption } from 'vite'
import { APP_NAME } from '../../constants.js'

export const coverage = (): PluginOption => ({
  name: `vite-plugin-${APP_NAME}`,
  buildStart: () => {},
  transform: () => {}
})
