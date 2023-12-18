import process from 'node:process'
import packageJson from '../../package.json'
import { spc } from '../spc/index.js'
import { isLogLevel } from '../utils/logLevel.js'
import { helps } from './help.js'
import { parseArgv } from './utils/parseArgv.js'

const { command, logLevel, help, version, output } = parseArgv(process.argv)

if (help) {
  console.log(helps)
  process.exit(0)
}

if (version) {
  console.log(packageJson.version)
  process.exit(0)
}

const code = await spc(command, {
  output,
  logLevel: logLevel && isLogLevel(logLevel) ? logLevel : undefined
})

process.exit(code)
