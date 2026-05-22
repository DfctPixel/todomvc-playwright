import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/todo-page';

test.describe('TodoMVC Advanced CRUD', () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  test('should toggle all todos at once', async () => {
    await todoPage.addTodos('One', 'Two', 'Three');
    await todoPage.toggleAllTodos();
    expect(await todoPage.isCompleted(0)).toBe(true);
    expect(await todoPage.isCompleted(1)).toBe(true);
    expect(await todoPage.isCompleted(2)).toBe(true);
  });

  test('should un-complete a todo by toggling it again', async () => {
    await todoPage.addTodo('Toggle me');
    await todoPage.toggleTodo(0);
    expect(await todoPage.isCompleted(0)).toBe(true);
    await todoPage.toggleTodo(0);
    expect(await todoPage.isCompleted(0)).toBe(false);
  });

  test('should filter by active todos', async () => {
    await todoPage.addTodos('Active one', 'Done one');
    await todoPage.toggleTodo(1);
    await todoPage.filterByActive();
    expect(await todoPage.getCount()).toBe(1);
    expect(await todoPage.getTodoText(0)).toBe('Active one');
  });

  test('should filter by completed todos', async () => {
    await todoPage.addTodos('Active one', 'Done one');
    await todoPage.toggleTodo(1);
    await todoPage.filterByCompleted();
    expect(await todoPage.getCount()).toBe(1);
    expect(await todoPage.getTodoText(0)).toBe('Done one');
  });

  test('should un-complete from completed filter and disappear', async () => {
    await todoPage.addTodo('Revert me');
    await todoPage.toggleTodo(0);
    await todoPage.filterByCompleted();
    expect(await todoPage.getCount()).toBe(1);
    await todoPage.toggleTodo(0);
    expect(await todoPage.getCount()).toBe(0);
  });

  test('should bulk add then delete all', async () => {
    await todoPage.addTodos('A', 'B', 'C');
    expect(await todoPage.getCount()).toBe(3);
    for (let i = 2; i >= 0; i--) {
      await todoPage.deleteTodo(i);
    }
    expect(await todoPage.getCount()).toBe(0);
  });
});
