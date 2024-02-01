import { test } from '@playwright/test'
import home from './stages/home'
import characterDetail from './stages/characterDetail'

test.describe('Test application', () => {
  test('Application flow', async ({ page }) => {
    test.setTimeout(100000)
    page.goto('/home')

    await home(page)
    await characterDetail(page)
  })
})
