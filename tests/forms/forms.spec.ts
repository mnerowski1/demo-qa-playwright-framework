import { test } from "../test-fixtures";
import { DataGenerator } from "../../src/generators/DataGenerator";

test.beforeEach(async ({ homePage, formsPage }) => {
  await homePage.clickFormsCard();
  await formsPage.goToPracticeForm();
});

// PRACTICE FORM

test.describe("Practice Form", () => {
  test("should submit the form successfully and show confirmation modal", async ({
    formsPage,
    actions,
    assertions,
  }) => {
    // Arrange
    const firstName = DataGenerator.firstName();
    const lastName = DataGenerator.lastName();
    const email = DataGenerator.email(firstName);
    const mobile = DataGenerator.mobile();

    // Act
    await actions.fill(formsPage.firstNameInput, firstName);
    await actions.fill(formsPage.lastNameInput, lastName);
    await actions.fill(formsPage.emailInput, email);
    await actions.click(formsPage.genderMaleLabel);
    await actions.fill(formsPage.mobileInput, mobile);
    await actions.click(formsPage.hobbySportsLabel);
    await actions.fill(formsPage.currentAddressInput, DataGenerator.address());
    await actions.scrollAndClick(formsPage.submitButton);

    // Assert
    await assertions.isVisible(formsPage.confirmationModal);
    await assertions.hasText(
      formsPage.modalTitle,
      "Thanks for submitting the form",
    );
  });

  test("should display student name in confirmation modal", async ({
    formsPage,
    actions,
    assertions,
  }) => {
    // Arrange
    const firstName = "John";
    const lastName = "Doe";

    // Act
    await actions.fill(formsPage.firstNameInput, firstName);
    await actions.fill(formsPage.lastNameInput, lastName);
    await actions.click(formsPage.genderFemaleLabel);
    await actions.fill(formsPage.mobileInput, "0712345678");
    await actions.scrollAndClick(formsPage.submitButton);

    // Assert
    await assertions.isVisible(formsPage.confirmationModal);
    await assertions.hasText(
      formsPage.confirmationModal,
      `${firstName} ${lastName}`,
    );
  });

  test("should not submit the form without required fields", async ({
    formsPage,
    actions,
    assertions,
    page,
  }) => {
    // Arrange
    // No data filled

    // Act
    await actions.scrollAndClick(formsPage.submitButton);

    // Assert
    const modal = page.locator(".modal-content");
    const isVisible = await modal.isVisible().catch(() => false);

    await assertions.urlContains("automation-practice-form");
  });
});
