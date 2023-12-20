export const pickSourceMappingURL = (source?: string) =>
  source?.match(/\/\/# sourceMappingURL=(.*)/)?.[1]
