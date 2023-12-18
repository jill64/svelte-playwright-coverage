export const getOutDir = () => {
  const outDir = process.env.SVELTE_PLAYWRIGHT_COVERAGE_OUTPUT

  if (!outDir) {
    throw new Error('SVELTE_PLAYWRIGHT_COVERAGE_OUTPUT is not set')
  }

  return outDir
}
