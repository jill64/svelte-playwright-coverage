# memo

## global

### env

| key                                 | description                  | native |
| ----------------------------------- | ---------------------------- | ------ |
| `NODE_V8_COVERAGE`                  | V8 Coverage Output Directory | ✅     |
| `SVELTE_PLAYWRIGHT_COVERAGE_ENABLE` | Enable Coverage Mode         |        |

## src

- vite

  vite-plugin for coverage

  - Getting source map

- test

  playwright `test` function alternative

  - Collect client v8 raw coverage

- bin (cli entry)
  - Enable coverage mode in `vite` + `test`
  - correct server v8 raw coverage
  - resolve v8 coverage from source map
  - marge v8 coverage
  - convert v8 to istanbul
