import { readFile, writeFile } from 'fs/promises'
import { Serde } from 'ts-serde'
import { string } from 'ts-serde/primitive'

export const transformFile = async <T = string>(
  from: string,
  to: string,
  fn: (source: T) => T,
  serde?: Serde<T>
) => {
  const { serialize, deserialize } = (serde ?? string) as Serde<T>

  const source = await readFile(from, 'utf-8')

  const obj = deserialize(source)

  const transformed = fn(obj)

  const str = serialize(transformed)

  await writeFile(to, str)
}
