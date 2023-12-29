#!/usr/bin/env node

import process from 'node:process'
import { spc } from '../spc/index.js'

await spc.run(process.argv)
