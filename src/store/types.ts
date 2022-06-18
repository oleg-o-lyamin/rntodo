import {TodoItem} from '../screens/TodoList/TodoList.types';

export interface TodosState {
  todos: TodosMap;
  requestStatus: FetchStatus;
}

export interface AppState {
  todos: TodosState;
}

export type TodosMap = {
  [id: string]: TodoItem;
};

export enum ActionType {
  SetTodos = 'SetTodos',
  FetchTodosRequest = 'FetchTodosRequest',
  FetchTodosSuccess = 'FetchTodosSuccess',
  FetchTodosFailure = 'FetchTodosFailure',
  ChangeTodo = 'ChangeTodo',
  DeleteTodo = 'DeleteTodo',
}

export interface ActionBase {
  type: ActionType;
}

export enum FetchStatus {
  IDLE,
  PENDING,
  SUCCESS,
  FAILURE,
}

export type FetchTodosRequest = ActionBase;

export interface FetchTodosSuccess extends ActionBase {
  todos: {[key: string]: TodoItem};
}

export type FetchTodosFailure = ActionBase;

export interface ChangeTodo extends ActionBase {
  todo: TodoItem;
}

export interface DeleteTodo extends ActionBase {
  todo: TodoItem;
}

export type Action =
  | FetchTodosRequest
  | FetchTodosFailure
  | FetchTodosRequest
  | ChangeTodo
  | DeleteTodo;
