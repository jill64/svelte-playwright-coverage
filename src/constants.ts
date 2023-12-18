import path from 'path'
import packageJson from '../package.json' assert { type: 'json' }

export const APP_NAME = packageJson.name

export const PLAYWRIGHT_RAW_DIR = path.join('playwright', 'raw')
export const VITE_RAW_DIR = path.join('vite', 'raw')
