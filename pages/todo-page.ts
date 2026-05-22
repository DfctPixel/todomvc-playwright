import { Page, Locator } from '@playwright/test';

const BASE_URL = 'https://demo.playwright.dev/todomvc';

export class TodoPage {
  readonly page: Page;
  readonly input: Locator;
  readonly todoItems: Locator;
  readonly todoCount: Locator;
  readonly clearCompleted: Locator;
  readonly toggleAll: Locator;
  readonly filterAll: Locator;
  readonly filterActive: Locator;
  readonly filterCompleted: Locator;

  constructor(page: Page) {
    this.page = page;
    this.input = page.getByPlaceholder('What needs to be done?');
    this.todoItems = page.locator('.todo-list li');
    this.todoCount = page.locator('.todo-count');
    this.clearCompleted = page.locator('.clear-completed');
    this.toggleAll = page.locator('.toggle-all');
    this.filterAll = page.locator('a[href="#/"]');
    this.filterActive = page.locator('a[href="#/active"]');
    this.filterCompleted = page.locator('a[href="#/completed"]');
  }

  async goto() {
    await this.page.goto(`${BASE_URL}/#/`);
  }

  async addTodo(text: string) {
    await this.input.fill(text);
    await this.input.press('Enter');
  }

  async addTodos(...texts: string[]) {
    for (const text of texts) {
      await this.addTodo(text);
    }
  }

  async getTodoText(index: number): Promise<string> {
    return (await this.todoItems.nth(index).locator('label').textContent()) ?? '';
  }

  async getTodoTexts(): Promise<string[]> {
    return await this.todoItems.locator('label').allTextContents();
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

  async isCompleted(index: number): Promise<boolean> {
    const cls = await this.todoItems.nth(index).getAttribute('class');
    return cls?.includes('completed') ?? false;
  }

  async getCount(): Promise<number> {
    return await this.todoItems.count();
  }

  async clearCompletedTodos() {
    await this.clearCompleted.click();
  }

  async toggleAllTodos() {
    await this.toggleAll.click();
  }

  async filterByAll() {
    await this.filterAll.click();
  }

  async filterByActive() {
    await this.filterActive.click();
  }

  async filterByCompleted() {
    await this.filterCompleted.click();
  }
}
