import { branchPreview, extendsConfig } from '@jill64/playwright-config'

export default extendsConfig(
  branchPreview({
    fallback: {
      webServer: {
        command: 'npm run spc cover npm run preview',
        port: 4173
      }
    }
  })
)
