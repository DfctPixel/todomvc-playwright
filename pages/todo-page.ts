import { Page, Locator } from '@playwright/test';

const BASE_URL = 'https://demo.playwright.dev/todomvc';

export class TodoPage {
  readonly page: Page;
  readonly input: Locator;
  readonly todoItems: Locator;
  readonly todoCount: Locator;
  readonly clearCompleted: Locator;

  constructor(page: Page) {
    this.page = page;
    this.input = page.getByPlaceholder('What needs to be done?');
    this.todoItems = page.locator('.todo-list li');
    this.todoCount = page.locator('.todo-count');
    this.clearCompleted = page.locator('.clear-completed');
  }

  async goto() {
    await this.page.goto(`${BASE_URL}/#/`);
  }

  async addTodo(text: string) {
    await this.input.fill(text);
    await this.input.press('Enter');
  }

  async getTodoText(index: number): Promise<string> {
    return (await this.todoItems.nth(index).locator('label').textContent()) ?? '';
  }

  async toggleTodo(index: number) {
    await this.todoItems.nth(index).locator('.toggle').click();
  }

  async editTodo(index: number, newText: string) {
    const item = this.todoItems.nth(index);
    await item.dblclick();
    const editInput = item.locator('.edit');
    await editInput.fill(newText);
    await editInput.press('Enter');
  }

  async deleteTodo(index: number) {
    await this.todoItems.nth(index).hover();
    await this.todoItems.nth(index).locator('.destroy').click();
  }

  async isVisible(index: number): Promise<boolean> {
    return await this.todoItems.nth(index).isVisible();
  }

  async getCount(): Promise<number> {
    return await this.todoItems.count();
  }

  async clearCompletedTodos() {
    await this.clearCompleted.click();
  }
}
