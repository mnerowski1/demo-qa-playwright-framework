import { Page } from "@playwright/test";

/**
 * TypeScript CLASS: Encapsulates the DemoQA homepage.
 * The constructor receives a Page object (dependency injection pattern).
 */
export class HomePage {
  // TypeScript class property: typed reference to the Playwright Page
  readonly page: Page;

  // CONSTRUCTOR: runs when we do `new HomePage(page)`
  constructor(page: Page) {
    this.page = page;
  }

  async open(): Promise<void> {
    await this.page.goto("/");
  }

  async clickElementsCard(): Promise<void> {
    await this.page.click('.card-body h5:has-text("Elements")');
  }

  async clickFormsCard(): Promise<void> {
    await this.page.click('.card-body h5:has-text("Forms")');
  }
}
