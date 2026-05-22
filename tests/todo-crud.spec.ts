import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/todo-page';

test.describe('TodoMVC CRUD', () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  test('should create a todo', async () => {
    await todoPage.addTodo('Buy milk');
    expect(await todoPage.getCount()).toBe(1);
    expect(await todoPage.getTodoText(0)).toBe('Buy milk');
  });

  test('should read todos', async () => {
    await todoPage.addTodo('Task A');
    await todoPage.addTodo('Task B');
    expect(await todoPage.getCount()).toBe(2);
    expect(await todoPage.getTodoText(0)).toBe('Task A');
    expect(await todoPage.getTodoText(1)).toBe('Task B');
  });

  test('should update a todo', async () => {
    await todoPage.addTodo('Old task');
    await todoPage.editTodo(0, 'Updated task');
    expect(await todoPage.getTodoText(0)).toBe('Updated task');
  });

  test('should delete a todo', async () => {
    await todoPage.addTodo('To delete');
    expect(await todoPage.getCount()).toBe(1);
    await todoPage.deleteTodo(0);
    expect(await todoPage.getCount()).toBe(0);
  });

  test('should mark todo as completed', async () => {
    await todoPage.addTodo('Complete me');
    await todoPage.toggleTodo(0);
    await expect(todoPage.todoItems.nth(0)).toHaveClass(/completed/);
  });

  test('should clear completed todos', async () => {
    await todoPage.addTodo('One');
    await todoPage.addTodo('Two');
    await todoPage.toggleTodo(0);
    await todoPage.clearCompletedTodos();
    expect(await todoPage.getCount()).toBe(1);
    expect(await todoPage.getTodoText(0)).toBe('Two');
  });
});
