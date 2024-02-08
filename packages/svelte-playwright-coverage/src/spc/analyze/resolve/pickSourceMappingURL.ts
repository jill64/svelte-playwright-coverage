export const pickSourceMappingURL = (source: string | undefined | null) =>
  source?.match(/\/\/# sourceMappingURL=(.*)/)?.[1]
