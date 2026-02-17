import { Locator, Page } from "@playwright/test";

/**
 * TypeScript CLASS: Represents the Elements section sidebar and sub-pages.
 * Each method navigates to a specific element sub-page using click (not goto).
 */
export class ElementsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // --- Sidebar navigation via clicks ---

  async goToTextBox(): Promise<void> {
    await this.page.click('span:has-text("Text Box")');
  }

  async goToCheckBox(): Promise<void> {
    await this.page.click('span:has-text("Check Box")');
  }

  async goToRadioButton(): Promise<void> {
    await this.page.click('span:has-text("Radio Button")');
  }

  async goToWebTables(): Promise<void> {
    await this.page.click('span:has-text("Web Tables")');
  }

  async goToButtons(): Promise<void> {
    await this.page.click('span:has-text("Buttons")');
  }

  // --- Text Box locators ---

  get fullNameInput() {
    return this.page.locator("#userName");
  }

  get emailInput() {
    return this.page.locator("#userEmail");
  }

  get currentAddressInput() {
    return this.page.locator("#currentAddress");
  }

  get permanentAddressInput() {
    return this.page.locator("#permanentAddress");
  }

  get submitButton() {
    return this.page.locator("#submit");
  }

  get outputBox() {
    return this.page.locator("#output");
  }

  // --- Check Box locators ---

  get expandAllButton() {
    return this.page.locator(".rc-tree-switcher");
  }

  get homeCheckbox() {
    return this.page.getByRole("checkbox", { name: "Select Home" });
  }

  get checkboxResult() {
    return this.page.locator(".display-result");
  }

  // --- Radio Button locators ---

  get yesRadio() {
    return this.page.locator('label[for="yesRadio"]');
  }

  get impressiveRadio() {
    return this.page.locator('label[for="impressiveRadio"]');
  }

  get radioSuccessMessage() {
    return this.page.locator(".mt-3");
  }

  // --- Web Tables locators ---

  get addButton() {
    return this.page.locator("#addNewRecordButton");
  }

  get tableRows() {
    return this.page.locator("tr").filter({ hasNot: this.page.locator("th") });
  }

  get searchBox() {
    return this.page.locator("#searchBox");
  }

  // Registration form inside Web Tables modal
  get firstNameInput() {
    return this.page.locator("#firstName");
  }

  get lastNameInput() {
    return this.page.locator("#lastName");
  }

  get emailInputModal() {
    return this.page.locator("#userEmail");
  }

  get ageInput() {
    return this.page.locator("#age");
  }

  get salaryInput() {
    return this.page.locator("#salary");
  }

  get departmentInput() {
    return this.page.locator("#department");
  }

  get saveButton() {
    return this.page.locator("#submit");
  }

  // --- Buttons locators ---

  get doubleClickButton() {
    return this.page.locator("#doubleClickBtn");
  }

  get rightClickButton() {
    return this.page.locator("#rightClickBtn");
  }

  get dynamicClickButton() {
    return this.page.locator('button:has-text("Click Me")').last();
  }

  get doubleClickMessage() {
    return this.page.locator("#doubleClickMessage");
  }

  get rightClickMessage() {
    return this.page.locator("#rightClickMessage");
  }

  get dynamicClickMessage() {
    return this.page.locator("#dynamicClickMessage");
  }

  //Web Tables functions

  async getFirstNames(): Promise<string[]> {
    const cells: Locator[] = await this.page.locator("tr td:first-child").all();
    const firstNames: string[] = await Promise.all(
      cells.map((cell) => cell.innerText()),
    );
    return firstNames;
  }
}
