import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import { coverage } from '../src/vite/index.js'

export default defineConfig({
  plugins: [Inspect(), sveltekit(), coverage()]
})
