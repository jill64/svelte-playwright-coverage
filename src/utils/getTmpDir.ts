export const getTmpDir = () => {
  const tmpDir = process.env.NODE_V8_COVERAGE

  if (!tmpDir) {
    throw new Error('NODE_V8_COVERAGE is not set')
  }

  return tmpDir
}
