import { test as baseTest } from "@playwright/test";
import { HomePage } from "../src/pages/HomePage";
import { ElementsPage } from "../src/pages/ElementsPage";
import { FormsPage } from "../src/pages/FormsPage";
import { Actions } from "../src/actions/Actions";
import { Assertions } from "../src/assertions/Assertions";

type TestFixtures = {
  homePage: HomePage;
  elementsPage: ElementsPage;
  formsPage: FormsPage;
  actions: Actions;
  assertions: Assertions;
};

export const test = baseTest.extend<TestFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await use(homePage);
  },
  elementsPage: async ({ page }, use) => {
    const elementsPage = new ElementsPage(page);
    await use(elementsPage);
  },
  formsPage: async ({ page }, use) => {
    const formsPage = new FormsPage(page);
    await use(formsPage);
  },
  actions: async ({ page }, use) => {
    const actions = new Actions(page);
    await use(actions);
  },
  assertions: async ({ page }, use) => {
    const assertions = new Assertions(page);
    await use(assertions);
  },
});

export { expect } from "@playwright/test";
