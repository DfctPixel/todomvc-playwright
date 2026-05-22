import { Page, Locator } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'https://demo.playwright.dev/todomvc';

export class TodoPage {
  readonly page: Page;
  readonly input: Locator;
  readonly todoItems: Locator;
  readonly todoCount: Locator;
  readonly clearCompleted: Locator;
  readonly toggleAll: Locator;

  constructor(page: Page) {
    this.page = page;
    this.input = page.getByPlaceholder('What needs to be done?');
    this.todoItems = page.locator('.todo-list li');
    this.todoCount = page.locator('.todo-count');
    this.clearCompleted = page.locator('.clear-completed');
    this.toggleAll = page.getByLabel('Mark all as complete');
  }

  async goto() {
    const { page } = this;
    await page.goto(`${BASE_URL}/#/`);
  }

  async addTodo(text: string) {
    const { input } = this;
    await input.fill(text);
    await input.press('Enter');
  }

  async getTodoText(index: number): Promise<string> {
    const item = this.todoItems.nth(index);
    return (await item.getByTestId('todo-title').textContent()) ?? '';
  }

  async toggleTodo(index: number) {
    const item = this.todoItems.nth(index);
    await item.getByLabel('Toggle Todo').click();
  }

  async editTodo(index: number, newText: string) {
    const item = this.todoItems.nth(index);
    await item.getByTestId('todo-title').dblclick();
    await item.getByLabel('Edit').fill(newText);
    await item.getByLabel('Edit').press('Enter');
  }

  async deleteTodo(index: number) {
    const item = this.todoItems.nth(index);
    await item.hover();
    await item.getByLabel('Delete').click();
  }

  async isVisible(index: number): Promise<boolean> {
    const item = this.todoItems.nth(index);
    return await item.isVisible();
  }

  async getCount(): Promise<number> {
    const { todoItems } = this;
    return await todoItems.count();
  }

  async clearCompletedTodos() {
    const { clearCompleted } = this;
    await clearCompleted.click();
  }

  async toggleAllTodos() {
    const { toggleAll } = this;
    await toggleAll.click();
  }
}
