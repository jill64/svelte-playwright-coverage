<!----- BEGIN GHOST DOCS HEADER ----->

# svelte-playwright-coverage

<!----- BEGIN GHOST DOCS BADGES -----><a href="https://github.com/jill64/svelte-playwright-coverage/actions/workflows/ci.yml"><img src="https://github.com/jill64/svelte-playwright-coverage/actions/workflows/ci.yml/badge.svg" alt="ci.yml" /></a><!----- END GHOST DOCS BADGES ----->

☂️ Coverage Tools for Playwright and Svelte

<!----- END GHOST DOCS HEADER ----->

# WIP

Below is a draft.

## Installation

```sh
npm i -D svelte-playwright-coverage
```

## Setup

1. Add vite plugin to `vite.config.js`

```js
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import { coverage } from 'svelte-playwright-coverage/vite'

export default defineConfig({
  plugins: [sveltekit(), coverage()]
})
```

2. Use `svelte-playwright-coverage/test` instead of `@playwright/test` in your tests

```diff
- import { test, expect } from '@playwright/test'
+ import { test, expect } from 'svelte-playwright-coverage/test'
```

## Usage

Run test command with `spc`(**S**velte **P**laywright **C**overage)

```sh
spc playwright test
```

If pass options to `spc`, before the test command.

```sh
spc --output coverage-result playwright test
```

## See more options

```sh
spc -h
```
