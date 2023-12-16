import type { PluginOption } from 'vite'
import { VITE_PLUGIN_NAME } from '../constants.js'

export const coverage = (): PluginOption => ({
  name: VITE_PLUGIN_NAME,
  buildStart: () => {},
  transform: () => {}
})
