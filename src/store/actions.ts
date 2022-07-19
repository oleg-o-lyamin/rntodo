import {ThunkAction} from 'redux-thunk';
import {config} from '../config';
import {TodoItem} from '../screens/TodoList/TodoList.types';
import {
  ActionType,
  FetchTodosFailure,
  FetchTodosSuccess,
  TodosState,
  ChangeTodo,
  DeleteTodo,
} from './types';

export const fetchTodosSuccess = (todos: TodosMap): FetchTodosSuccess => ({
  type: ActionType.FetchTodosSuccess,
  todos,
});

export const fetchTodosFailure = (): FetchTodosFailure => ({
  type: ActionType.FetchTodosFailure,
});

export const fetchTodosRequest = () => ({
  type: ActionType.FetchTodosRequest,
});

export const fetchTodos =
  (): ThunkAction<
    void,
    TodosState,
    unknown,
    FetchTodosSuccess | FetchTodosFailure
  > =>
  async dispatch => {
    dispatch(fetchTodosRequest());
    try {
      const response = await fetch(config.todosUrl);
      const result: TodoItem[] = await response.json();
      const todos = result.slice(0, 20).reduce((acc, todo) => {
        acc[todo.id] = {...todo, assets: [], notificationIsOn: false};
        return acc;
      }, {});

      dispatch(fetchTodosSuccess(todos));
    } catch (e) {
      dispatch(fetchTodosFailure());
    }
  };

export const changeTodo = (todo: TodoItem): ChangeTodo => ({
  type: ActionType.ChangeTodo,
  todo,
});

export const deleteTodo = (todo: TodoItem): DeleteTodo => ({
  type: ActionType.DeleteTodo,
  todo,
})
