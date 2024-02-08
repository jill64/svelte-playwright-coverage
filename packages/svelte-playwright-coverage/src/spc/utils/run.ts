import { spawn } from 'node:child_process'

export const run = (rest: string[]) => {
  const command = rest.join(' ')

  return spawn(command, {
    stdio: 'inherit',
    shell: true
  })
}
