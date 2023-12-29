import { extendsConfig } from '@jill64/playwright-config'

export default extendsConfig({
  webServer: {
    command: 'npm run spc cover pnpm preview',
    port: 4173
  }
})
