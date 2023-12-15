import { defineConfig } from '@playwright/test'

export default defineConfig({
  webServer: {
    command: 'npm run dev',
    port: 5173,
    reuseExistingServer: true
  },
  testDir: 'tests',
  retries: process.env.CI ? 2 : 0,
  fullyParallel: true,
  workers: '100%'
})
