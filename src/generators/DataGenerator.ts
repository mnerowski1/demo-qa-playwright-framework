/**
 * TypeScript OBJECT (plain object / namespace pattern): DataGenerator
 * Used to produce random test data so tests stay independent from each other.
 * No class needed here — pure functions grouped into a simple exported object.
 */

export const DataGenerator = {
  /**
   * Returns a random first name from a small list.
   */
  firstName(): string {
    const names = ["Alice", "Bob", "Charlie", "Diana", "Edward"];
    return names[Math.floor(Math.random() * names.length)];
  },

  lastName(): string {
    const names = ["Smith", "Johnson", "Williams", "Brown", "Jones"];
    return names[Math.floor(Math.random() * names.length)];
  },

  /**
   * Generates a simple valid email from the provided name.
   */
  email(name: string = "test"): string {
    const clean = name.toLowerCase().replace(/\s+/g, "");
    return `${clean}${Math.floor(Math.random() * 9000 + 1000)}@test.com`;
  },

  mobile(): string {
    return `07${Math.floor(Math.random() * 900000000 + 100000000)}`.slice(
      0,
      10,
    );
  },

  address(): string {
    return `${Math.floor(Math.random() * 999 + 1)} Example Street, Testville`;
  },

  age(): string {
    return String(Math.floor(Math.random() * 40 + 20)); // 20–59
  },

  salary(): string {
    return String(Math.floor(Math.random() * 90000 + 10000)); // 10k–99k
  },

  department(): string {
    const depts = ["Engineering", "QA", "Design", "Product", "Marketing"];
    return depts[Math.floor(Math.random() * depts.length)];
  },
};
