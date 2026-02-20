import { Page } from "@playwright/test";

export class FormsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToPracticeForm(): Promise<void> {
    await this.page.click('span:has-text("Practice Form")');
  }

  // Locators

  get firstNameInput() {
    return this.page.locator("#firstName");
  }

  get lastNameInput() {
    return this.page.locator("#lastName");
  }

  get emailInput() {
    return this.page.locator("#userEmail");
  }

  get mobileInput() {
    return this.page.locator("#userNumber");
  }

  get genderMaleLabel() {
    return this.page.locator('label[for="gender-radio-1"]');
  }

  get genderFemaleLabel() {
    return this.page.locator('label[for="gender-radio-2"]');
  }

  get dobInput() {
    return this.page.locator("#dateOfBirthInput");
  }

  get subjectsInput() {
    return this.page.locator("#subjectsInput");
  }

  get hobbySportsLabel() {
    return this.page.locator('label[for="hobbies-checkbox-1"]');
  }

  get currentAddressInput() {
    return this.page.locator("#currentAddress");
  }

  get submitButton() {
    return this.page.locator("#submit");
  }

  // Confirmation modal after submit
  get confirmationModal() {
    return this.page.locator(".modal-content");
  }

  get modalTitle() {
    return this.page.locator("#example-modal-sizes-title-lg");
  }

  get modalCloseButton() {
    return this.page.locator("#closeLargeModal");
  }

  // Helper: get cell value from confirmation table by label
  getModalValueByLabel(label: string) {
    return this.page
      .locator(".table-responsive td", { hasText: label })
      .locator("+ td");
  }
}
