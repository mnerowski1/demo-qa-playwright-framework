import { test, Page, expect } from "@playwright/test";
import { HomePage } from "../../src/pages/HomePage";
import { ElementsPage } from "../../src/pages/ElementsPage";
import { Actions } from "../../src/actions/Actions";
import { Assertions } from "../../src/assertions/Assertions";
import { DataGenerator } from "../../src/generators/DataGenerator";

/**
 * TypeScript usage note:
 * - `test.beforeEach` receives a `{ page }` OBJECT (destructured from Playwright fixtures)
 * - We instantiate classes with `new` inside each test or in beforeEach
 * - `let` variables declared outside are re-assigned per test
 */

let homePage: HomePage;
let elementsPage: ElementsPage;
let actions: Actions;
let assertions: Assertions;

test.beforeEach(async ({ page }: { page: Page }) => {
  // Instantiate all page-object classes with the current Page instance
  homePage = new HomePage(page);
  elementsPage = new ElementsPage(page);
  actions = new Actions(page);
  assertions = new Assertions(page);

  // Navigate to the site and enter Elements section via click
  await homePage.open();
  await homePage.clickElementsCard();
});

// ---------------------------------------------------------------------------
// TEXT BOX
// ---------------------------------------------------------------------------

test.describe("Text Box", () => {
  test("should submit the text box form and display output", async () => {
    await elementsPage.goToTextBox();

    const name = DataGenerator.firstName();
    const email = DataGenerator.email(name);
    const address = DataGenerator.address();

    await actions.fill(elementsPage.fullNameInput, name);
    await actions.fill(elementsPage.emailInput, email);
    await actions.fill(elementsPage.currentAddressInput, address);
    await actions.scrollAndClick(elementsPage.submitButton);

    await assertions.isVisible(elementsPage.outputBox);
    await assertions.hasText(elementsPage.outputBox, name);
    await assertions.hasText(elementsPage.outputBox, email);
  });
});

// ---------------------------------------------------------------------------
// CHECK BOX
// ---------------------------------------------------------------------------

test.describe("Check Box", () => {
  test("should expand tree and select a checkbox", async () => {
    await elementsPage.goToCheckBox();

    await actions.click(elementsPage.expandAllButton);
    await actions.click(elementsPage.homeCheckbox);

    await assertions.isVisible(elementsPage.checkboxResult);
  });
});

// ---------------------------------------------------------------------------
// RADIO BUTTON
// ---------------------------------------------------------------------------

test.describe("Radio Button", () => {
  test("should select Yes radio button", async () => {
    await elementsPage.goToRadioButton();

    await actions.click(elementsPage.yesRadio);
    await assertions.hasText(elementsPage.radioSuccessMessage, "Yes");
  });

  test("should select Impressive radio button", async () => {
    await elementsPage.goToRadioButton();

    await actions.click(elementsPage.impressiveRadio);
    await assertions.hasText(elementsPage.radioSuccessMessage, "Impressive");
  });
});

// ---------------------------------------------------------------------------
// WEB TABLES
// ---------------------------------------------------------------------------

test.describe("Web Tables", () => {
  test("should add a new record via the registration form", async () => {
    await elementsPage.goToWebTables();

    await actions.click(elementsPage.addButton);

    const firstName = DataGenerator.firstName();
    const lastName = DataGenerator.lastName();
    const email = DataGenerator.email(firstName);

    await actions.fill(elementsPage.firstNameInput, firstName);
    await actions.fill(elementsPage.lastNameInput, lastName);
    await actions.fill(elementsPage.emailInputModal, email);
    await actions.fill(elementsPage.ageInput, DataGenerator.age());
    await actions.fill(elementsPage.salaryInput, DataGenerator.salary());
    await actions.fill(
      elementsPage.departmentInput,
      DataGenerator.department(),
    );

    await actions.scrollAndClick(elementsPage.saveButton);

    const firstNames: string[] = await elementsPage.getFirstNames();
    expect(firstNames).toContain(firstName);
    await assertions.containsValue(firstNames, firstName);
  });

  test("should search for a record by first name", async () => {
    await elementsPage.goToWebTables();

    // 'Cierra' exists in the default data set
    await actions.fill(elementsPage.searchBox, "Cierra");
    await assertions.hasText(elementsPage.tableRows, "Cierra");
  });
});

// ---------------------------------------------------------------------------
// BUTTONS
// ---------------------------------------------------------------------------

test.describe("Buttons", () => {
  test("should trigger double click message", async () => {
    await elementsPage.goToButtons();

    await actions.doubleClick(elementsPage.doubleClickButton);
    await assertions.hasText(
      elementsPage.doubleClickMessage,
      "You have done a double click",
    );
  });

  test("should trigger right click message", async () => {
    await elementsPage.goToButtons();

    await actions.rightClick(elementsPage.rightClickButton);
    await assertions.hasText(
      elementsPage.rightClickMessage,
      "You have done a right click",
    );
  });

  test("should trigger dynamic click message", async () => {
    await elementsPage.goToButtons();

    await actions.scrollAndClick(elementsPage.dynamicClickButton);
    await assertions.hasText(
      elementsPage.dynamicClickMessage,
      "You have done a dynamic click",
    );
  });
});
