import { extendsConfig } from '@jill64/playwright-config'

export default extendsConfig({
  webServer: {
    command: 'spc start npm run preview',
    port: 4173
  }
})
