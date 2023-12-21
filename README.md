<!----- BEGIN GHOST DOCS HEADER ----->

# svelte-playwright-coverage

<!----- BEGIN GHOST DOCS BADGES ----->

<a href="https://github.com/jill64/svelte-playwright-coverage/actions/workflows/ci.yml"><img src="https://github.com/jill64/svelte-playwright-coverage/actions/workflows/ci.yml/badge.svg" alt="ci.yml" /></a>

<!----- END GHOST DOCS BADGES ----->

☂️ Coverage Tools for Playwright and Svelte

<!----- END GHOST DOCS HEADER ----->

# 🚧 WIP

Below is a draft.

## Installation

```sh
npm i -D svelte-playwright-coverage
```

Each step uses the `spc`(**S**velte **P**laywright **C**overage) command included with the library.

## Setup

1. Add vite plugin to `vite.config.js`

```diff
// vite.config.js
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
+ import { coverage } from 'svelte-playwright-coverage/vite'

export default defineConfig({
  plugins: [
    sveltekit(),
+    coverage()
  ]
})
```

> [!NOTE]  
> Plugins are only enabled when `vite` is invoked via the `spc` command.

2. Use `svelte-playwright-coverage/test` instead of `@playwright/test` in your tests

```diff
- import { test, expect } from '@playwright/test'
+ import { test, expect } from 'svelte-playwright-coverage/test'
```

> [!NOTE]  
> The coverage feature is only enabled when test is started via the `spc` command.  
> Otherwise, `svelte-playwright-coverage/test` works equally well with `@playwright/test`.

3. Configure the `vite` server used for the test to be started with the `spc covered` command

```diff
// playwright.config.ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  webServer: {
-    command: 'npm run build && npm run preview',
+    command: 'npm run build && spc covered npm run preview',

    // ...
  }

  // ...
})
```

> [!NOTE]  
> Coverage works for both `vite dev` and `vite preview`.  
> Any coverage feature is only enabled when test is started via the `spc covered` command.

## Usage

Run test command with `spc`

```sh
spc playwright test
```

> [!IMPORTANT]
>
> `spc` executes any command, but the following conditions must be met
>
> - The `playwright` test command should be executed.
> - Run it in the root directory of the project.

> [!NOTE]
>
> The `playwright` coverage API is currently [supported by Chromium-based browsers](https://playwright.dev/docs/api/class-coverage).  
> If the test is run on a browser other than `chromium`, the test run will not be blocked, but a warning will be displayed in the console and no coverage will be collected.

If pass options to `spc`, before the test command.

```sh
spc --output coverage-result playwright test
```

## See more options

```sh
spc -h
```

## API

### Example

```js
import { spc } from 'svelte-playwright-coverage/spc'

const exitCode = await spc('playwright test', {
  output: 'coverage-result'
})
```

<!----- BEGIN GHOST DOCS FOOTER ----->

## License

MIT

<!----- END GHOST DOCS FOOTER ----->
