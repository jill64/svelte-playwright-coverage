import type { PluginOption } from 'vite'

export const coverage = (): PluginOption => ({
  name: 'vite-plugin-svelte-playwright-coverage',
  buildStart: () => {},
  transform: () => {}
})
