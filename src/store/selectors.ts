import {AppState} from './types';
export const selectTodos = (state: AppState) => state.todos.todos;
export const selectRequestStatus = (state: AppState) =>
  state.todos.requestStatus;
export const selectTodoById = (todoId: string) => (state: AppState) =>
  state.todos.todos[todoId];
