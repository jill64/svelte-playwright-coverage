#!/usr/bin/env node

import process from 'node:process'
import { spc } from '../spc/index.js'

spc.run(process.argv)
