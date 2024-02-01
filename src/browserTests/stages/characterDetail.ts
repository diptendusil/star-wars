import { test, expect, Page } from '@playwright/test'
import { webactions } from '../utils/webactions'

const characterDetail = (page: Page) => {
  return test.step('Character Detail', async () => {
    const homeBtn = page.getByRole('link', { name: 'Go Back' })
    const editBtn = page.getByRole('button', { name: 'edit' })
    const submitBtn = page.getByRole('button', { name: 'Done' })
    const cancelBtn = page.getByRole('button', { name: 'Close' })
    const form = page.locator('form')

    await expect(form).toContainText('Obi-Wan Kenobi')
    await expect(form).toContainText('182')
    await expect(form).toContainText('male')
    await expect(form).toContainText('A New Hope')
    await expect(form).toContainText('The Empire Strikes Back')
    await expect(form).toContainText('Return of the Jedi')
    await expect(form).toContainText('The Phantom Menace')
    await expect(form).toContainText('Attack of the Clones')
    await expect(form).toContainText('Revenge of the Sith')
    await expect(editBtn).toBeVisible()
    await expect(submitBtn).not.toBeVisible()
    await expect(cancelBtn).not.toBeVisible()
    await editBtn.click()
    await expect(submitBtn).toBeVisible()
    await webactions.enterValueInTextInput(page.getByLabel('gender'), '')
    await submitBtn.click()
    await expect(editBtn).not.toBeVisible()
    await webactions.enterValueInTextInput(page.getByLabel('gender'), 'female')
    await webactions.enterValueInTextInput(page.getByLabel('height'), '170')
    await submitBtn.click()
    await expect(editBtn).toBeVisible()
    await expect(form).toContainText('female')
    await expect(form).toContainText('170')
    await editBtn.click()
    await webactions.enterValueInTextInput(page.getByLabel('gender'), '')
    await cancelBtn.click()
    await expect(editBtn).toBeVisible()
    await expect(form).toContainText('female')
    await homeBtn.click()
    await page.getByRole('link', { name: /Obi-Wan Kenobi/ }).waitFor({ timeout: 1000 })
    await expect(page.getByRole('link', { name: /Obi-Wan Kenobi/ })).toContainText('female')
  })
}

export default characterDetail
