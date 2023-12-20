import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import { coverage } from '../svelte-playwright-coverage/src/vite/coverage'

export default defineConfig({
  plugins: [Inspect(), sveltekit(), coverage()]
})
