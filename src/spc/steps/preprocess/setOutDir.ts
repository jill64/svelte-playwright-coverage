import path from 'path'

export const setOutDir = (output: string) => {
  const outDir = path.join(process.cwd(), output)

  process.env.SVELTE_PLAYWRIGHT_COVERAGE_OUTPUT = outDir

  return outDir
}
