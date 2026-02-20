import { expect, Locator, Page } from "@playwright/test";

// Wraps Playwright `expect` assertions into readable methods.

export class Assertions {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async isVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  async hasText(locator: Locator, text: string): Promise<void> {
    await expect(locator).toContainText(text);
  }

  async urlContains(part: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(part));
  }

  async isChecked(locator: Locator): Promise<void> {
    await expect(locator).toBeChecked();
  }

  async isEnabled(locator: Locator): Promise<void> {
    await expect(locator).toBeEnabled();
  }

  async hasValue(locator: Locator, value: string): Promise<void> {
    await expect(locator).toHaveValue(value);
  }

  async rowCount(locator: Locator, count: number): Promise<void> {
    await expect(locator).toHaveCount(count);
  }

  async containsValue(array: string[], value: string): Promise<void> {
    expect(array).toContain(value);
  }
}
