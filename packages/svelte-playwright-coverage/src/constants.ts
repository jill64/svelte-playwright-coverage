import path from 'node:path'
import packageJson from '../package.json' assert { type: 'json' }

export const APP_NAME = packageJson.name

export const PLAYWRIGHT_RAW_DIR = path.join('playwright', 'raw')
export const PLAYWRIGHT_RESOLVED_DIR = path.join('playwright', 'resolved')

export const VITE_RAW_DIR = path.join('vite', 'raw')
export const VITE_RESOLVED_DIR = path.join('vite', 'resolved')

export const V8_FINAL_FILE = 'v8-final.json'
