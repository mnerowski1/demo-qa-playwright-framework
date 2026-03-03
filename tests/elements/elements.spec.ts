import { test } from "../test-fixtures";
import { DataGenerator } from "../../src/generators/DataGenerator";

test.beforeEach(async ({ homePage }) => {
  await homePage.clickElementsCard();
});

// TEXT BOX

test.describe("Text Box", () => {
  test("should submit the text box form and display output", async ({
    elementsPage,
    actions,
    assertions,
  }) => {
    // Arrange
    await elementsPage.goToTextBox();

    const name = DataGenerator.firstName();
    const email = DataGenerator.email(name);
    const address = DataGenerator.address();

    // Act
    await actions.fill(elementsPage.fullNameInput, name);
    await actions.fill(elementsPage.emailInput, email);
    await actions.fill(elementsPage.currentAddressInput, address);
    await actions.scrollAndClick(elementsPage.submitButton);

    // Assert
    await assertions.isVisible(elementsPage.outputBox);
    await assertions.hasText(elementsPage.outputBox, name);
    await assertions.hasText(elementsPage.outputBox, email);
  });
});

// CHECK BOX

test.describe("Check Box", () => {
  test("should expand tree and select a checkbox", async ({
    elementsPage,
    actions,
    assertions,
  }) => {
    // Arrange
    await elementsPage.goToCheckBox();

    // Act
    await actions.click(elementsPage.expandAllButton);
    await actions.click(elementsPage.homeCheckbox);

    // Assert
    await assertions.isVisible(elementsPage.checkboxResult);
  });
});

// RADIO BUTTON

test.describe("Radio Button", () => {
  test("should select Yes radio button", async ({
    elementsPage,
    actions,
    assertions,
  }) => {
    // Arrange
    await elementsPage.goToRadioButton();

    // Act
    await actions.click(elementsPage.yesRadio);

    // Assert
    await assertions.hasText(elementsPage.radioSuccessMessage, "Yes");
  });

  test("should select Impressive radio button", async ({
    elementsPage,
    actions,
    assertions,
  }) => {
    // Arrange
    await elementsPage.goToRadioButton();

    // Act
    await actions.click(elementsPage.impressiveRadio);

    // Assert
    await assertions.hasText(elementsPage.radioSuccessMessage, "Impressive");
  });
});

// WEB TABLES

test.describe("Web Tables", () => {
  test("should add a new record via the registration form", async ({
    elementsPage,
    actions,
    assertions,
  }) => {
    // Arrange
    await elementsPage.goToWebTables();

    const firstName = DataGenerator.firstName();
    const lastName = DataGenerator.lastName();
    const email = DataGenerator.email(firstName);

    // Act
    await actions.click(elementsPage.addButton);
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

    // Assert
    const firstNames: string[] = await elementsPage.getFirstNames();
    await assertions.containsValue(firstNames, firstName);
  });

  test("should search for a record by first name", async ({
    elementsPage,
    actions,
    assertions,
  }) => {
    // Arrange
    await elementsPage.goToWebTables();

    // Act
    // 'Cierra' exists in the default data set
    await actions.fill(elementsPage.searchBox, "Cierra");

    // Assert
    await assertions.hasText(elementsPage.tableRows, "Cierra");
  });
});

// BUTTONS-

test.describe("Buttons", () => {
  test("should trigger double click message", async ({
    elementsPage,
    actions,
    assertions,
  }) => {
    // Arrange
    await elementsPage.goToButtons();

    // Act
    await actions.doubleClick(elementsPage.doubleClickButton);

    // Assert
    await assertions.hasText(
      elementsPage.doubleClickMessage,
      "You have done a double click",
    );
  });

  test("should trigger right click message", async ({
    elementsPage,
    actions,
    assertions,
  }) => {
    // Arrange
    await elementsPage.goToButtons();

    // Act
    await actions.rightClick(elementsPage.rightClickButton);

    // Assert
    await assertions.hasText(
      elementsPage.rightClickMessage,
      "You have done a right click",
    );
  });

  test("should trigger dynamic click message", async ({
    elementsPage,
    actions,
    assertions,
  }) => {
    // Arrange
    await elementsPage.goToButtons();

    // Act
    await actions.scrollAndClick(elementsPage.clickMeButton);

    // Assert
    await assertions.hasText(
      elementsPage.dynamicClickMessage,
      "You have done a dynamic click",
    );
  });
});
