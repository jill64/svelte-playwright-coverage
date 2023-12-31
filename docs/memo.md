# memo

## global

### env

| key                                 | description                     | native |
| ----------------------------------- | ------------------------------- | ------ |
| `NODE_V8_COVERAGE`                  | V8 Coverage Output Directory    | ✅     |
| `SVELTE_PLAYWRIGHT_COVERAGE_OUTPUT` | Coverage Final Output Directory |        |

## src

- vite

  vite-plugin for coverage

  - Getting source map

- test

  playwright `test` function alternative

  - Collect client v8 raw coverage

- bin (cli entry)
  - Enable coverage mode in `vite` + `test` (by `SVELTE_PLAYWRIGHT_COVERAGE_OUTPUT`)
  - correct server v8 raw coverage (by `NODE_V8_COVERAGE`)
  - resolve v8 coverage from source map
  - marge v8 coverage
  - convert v8 to istanbul

## coverage/e2e

- vite
  - raw
  - map
- playwright
  - raw
