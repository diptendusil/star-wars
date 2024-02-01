import { Locator } from '@playwright/test'

export const webactions = {
  delay: async (time: number): Promise<void> => {
    return new Promise<void>((resolve) => {
      setTimeout(resolve, time)
    })
  },
  enterValueInTextInput: async (locator: Locator, value: string): Promise<void> => {
    await locator.waitFor()
    await locator.scrollIntoViewIfNeeded()
    await locator.click()
    await locator.fill(value)
  },
}
