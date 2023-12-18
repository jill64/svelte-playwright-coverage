// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AwaitedReturn<T extends (...args: any[]) => Promise<any>> = Awaited<
  ReturnType<T>
>
