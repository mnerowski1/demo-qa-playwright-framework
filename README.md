# DemoQA Playwright Framework

Test automation framework for [demoqa.com](https://demoqa.com), covering the **Elements** and **Forms** sections.

Built with **Playwright** + **TypeScript** using the **Page Object Model**.

---

## Project Structure

```
demoqa-playwright/
├── src/
│   ├── pages/          # Page Objects — locators & navigation
│   │   ├── HomePage.ts
│   │   ├── ElementsPage.ts
│   │   └── FormsPage.ts
│   ├── actions/        # Reusable browser interactions
│   │   └── Actions.ts
│   ├── assertions/     # Wrapped expect calls
│   │   └── Assertions.ts
│   └── generators/     # Random test data generators
│       └── DataGenerator.ts
├── tests/
│   ├── elements/
│   │   └── elements.spec.ts
│   └── forms/
│       └── forms.spec.ts
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

---

## Layer Responsibilities

| Layer          | File(s)                           | Purpose                                                |
| -------------- | --------------------------------- | ------------------------------------------------------ |
| **Pages**      | `src/pages/`                      | Locators + page-level navigation via `click`           |
| **Actions**    | `src/actions/Actions.ts`          | Wraps Playwright interactions (fill, click, dblclick…) |
| **Assertions** | `src/assertions/Assertions.ts`    | Wraps `expect(...)` calls into readable methods        |
| **Generators** | `src/generators/DataGenerator.ts` | Produces random, unique test data                      |
| **Tests**      | `tests/`                          | Orchestrates pages, actions, assertions per scenario   |

---

## Getting Started

### 1. Install dependencies

```bash
npm install
npx playwright install
```

### 2. Run all tests

```bash
npm test
```

### 3. Run only Elements tests

```bash
npm run test:elements
```

### 4. Run only Forms tests

```bash
npm run test:forms
```

### 5. View HTML report

```bash
npm run report
```

---

## Navigation Rules

Navigation within the app is done **exclusively via `click`** actions — no direct `goto('/some-path')` calls beyond the base URL. This mirrors real user behaviour and catches nav regressions.

Example flow:

1. `homePage.open()` → opens `https://demoqa.com`
2. `homePage.clickElementsCard()` → clicks the Elements card
3. `elementsPage.goToTextBox()` → clicks "Text Box" in the sidebar

---

## TypeScript Concepts Used

| Concept              | Where                                                                         |
| -------------------- | ----------------------------------------------------------------------------- |
| **Classes**          | All page objects, Actions, Assertions                                         |
| **Constructors**     | Every class accepts `Page` via `constructor(page: Page)`                      |
| **Plain objects**    | `DataGenerator` — groups pure functions, no need for a class                  |
| **Type annotations** | Method return types (`Promise<void>`), property types (`readonly page: Page`) |
| **Destructuring**    | `{ page }` in `test.beforeEach` fixture                                       |

---

## Coverage

### Elements

- ✅ Text Box — fill & submit form, verify output
- ✅ Check Box — expand tree, select item
- ✅ Radio Button — select Yes / Impressive
- ✅ Web Tables — add new record, search existing record
- ✅ Buttons — double click, right click, dynamic click

### Forms

- ✅ Practice Form — full valid submission, name in modal
- ✅ Practice Form — empty submission stays on page
