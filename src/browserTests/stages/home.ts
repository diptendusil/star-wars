import { test, expect, Page } from '@playwright/test'

const home = (page: Page) => {
  return test.step('Home Page', async () => {
    const backBtn = page.getByRole('button', { name: '<' })
    const fwdBtn = page.getByRole('button', { name: '>' })

    await page.getByText(/Luke Skywalker/).waitFor({ timeout: 5000 })
    await expect(page.getByText(/Tatooine/).nth(0)).toBeVisible({ timeout: 5000 })
    await expect(backBtn).toBeDisabled()
    await page.getByText(/Obi-Wan Kenobi/).scrollIntoViewIfNeeded()
    await expect(page.getByText(/Stewjon/)).toBeVisible({ timeout: 5000 })
    await fwdBtn.click()
    await expect(page.getByText('2 /')).toBeVisible()
    await expect(page.getByText(/Anakin Skywalker/)).toBeVisible({ timeout: 5000 })
    await backBtn.click()
    await page.getByText(/Obi-Wan Kenobi/).scrollIntoViewIfNeeded({ timeout: 5000 })
    await page.getByText(/Obi-Wan Kenobi/).click()
  })
}

export default home
