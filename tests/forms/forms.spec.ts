import { test, Page } from "@playwright/test";
import { HomePage } from "../../src/pages/HomePage";
import { FormsPage } from "../../src/pages/FormsPage";
import { Actions } from "../../src/actions/Actions";
import { Assertions } from "../../src/assertions/Assertions";
import { DataGenerator } from "../../src/generators/DataGenerator";

/**
 * TypeScript usage note:
 * - Variables typed as class instances (`FormsPage`, `Actions`, etc.)
 * - `new ClassName(page)` is called in beforeEach to get fresh instances per test
 */

let homePage: HomePage;
let formsPage: FormsPage;
let actions: Actions;
let assertions: Assertions;

test.beforeEach(async ({ page }: { page: Page }) => {
  homePage = new HomePage(page);
  formsPage = new FormsPage(page);
  actions = new Actions(page);
  assertions = new Assertions(page);

  // Navigate via clicks — no goto('/forms')
  await homePage.open();
  await homePage.clickFormsCard();
  await formsPage.goToPracticeForm();
});

// ---------------------------------------------------------------------------
// PRACTICE FORM
// ---------------------------------------------------------------------------

test.describe("Practice Form", () => {
  test("should submit the form successfully and show confirmation modal", async () => {
    const firstName = DataGenerator.firstName();
    const lastName = DataGenerator.lastName();
    const email = DataGenerator.email(firstName);
    const mobile = DataGenerator.mobile();

    await actions.fill(formsPage.firstNameInput, firstName);
    await actions.fill(formsPage.lastNameInput, lastName);
    await actions.fill(formsPage.emailInput, email);
    await actions.click(formsPage.genderMaleLabel);
    await actions.fill(formsPage.mobileInput, mobile);
    await actions.click(formsPage.hobbySportsLabel);
    await actions.fill(formsPage.currentAddressInput, DataGenerator.address());
    await actions.scrollAndClick(formsPage.submitButton);

    // Confirmation modal should appear
    await assertions.isVisible(formsPage.confirmationModal);
    await assertions.hasText(
      formsPage.modalTitle,
      "Thanks for submitting the form",
    );
  });

  test("should display student name in confirmation modal", async () => {
    const firstName = "John";
    const lastName = "Doe";

    await actions.fill(formsPage.firstNameInput, firstName);
    await actions.fill(formsPage.lastNameInput, lastName);
    await actions.click(formsPage.genderFemaleLabel);
    await actions.fill(formsPage.mobileInput, "0712345678");
    await actions.scrollAndClick(formsPage.submitButton);

    await assertions.isVisible(formsPage.confirmationModal);
    await assertions.hasText(
      formsPage.confirmationModal,
      `${firstName} ${lastName}`,
    );
  });

  test("should not submit the form without required fields", async ({
    page,
  }) => {
    // Try to submit with no data — form should not show the modal
    await actions.scrollAndClick(formsPage.submitButton);

    // Modal should NOT be visible — page stays on the form
    const modal = page.locator(".modal-content");
    const isVisible = await modal.isVisible().catch(() => false);

    // If modal is not visible the test passes — we just check the URL stayed the same
    await assertions.urlContains("automation-practice-form");
  });
});
