import { Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open(): Promise<void> {
    await this.page.goto("/");
  }

  async navigateTo(cardName: string): Promise<void> {
    await this.page.click(`.card-body h5:has-text("${cardName}")`);
  }

  async clickElementsCard(): Promise<void> {
    await this.navigateTo("Elements");
  }

  async clickFormsCard(): Promise<void> {
    await this.navigateTo("Forms");
  }
}
