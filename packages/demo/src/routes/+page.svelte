<script lang="ts">
  import { log } from '$lib/coverage-testing-module'

  log('Hello World')

  export let data

  $: ({ date, rand } = data)
</script>

rand: {rand}
date: {date}
<h1>Svelte App Template</h1>
