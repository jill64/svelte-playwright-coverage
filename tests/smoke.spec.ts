import {
  expect,
  test
} from '../packages/svelte-playwright-coverage/src/test/index.js'

test('smoke', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', { name: 'Svelte App Template' })
  ).toBeVisible()

  await page.waitForTimeout(1000)
})
