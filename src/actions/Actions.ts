import { Page } from "@playwright/test";

/**
 * TypeScript CLASS: Reusable browser interaction helpers.
 * These methods wrap common Playwright actions to keep test code clean.
 */
export class Actions {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fill(
    locator: ReturnType<Page["locator"]>,
    value: string,
  ): Promise<void> {
    await locator.clear();
    await locator.fill(value);
  }

  async click(locator: ReturnType<Page["locator"]>): Promise<void> {
    await locator.click();
  }

  async doubleClick(locator: ReturnType<Page["locator"]>): Promise<void> {
    await locator.dblclick();
  }

  async rightClick(locator: ReturnType<Page["locator"]>): Promise<void> {
    await locator.click({ button: "right" });
  }

  async scrollIntoView(locator: ReturnType<Page["locator"]>): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  async pressEnter(locator: ReturnType<Page["locator"]>): Promise<void> {
    await locator.press("Enter");
  }

  /**
   * Scroll to element and click — handy for sticky-header pages on demoqa
   */
  async scrollAndClick(locator: ReturnType<Page["locator"]>): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
    await locator.click();
  }
}
