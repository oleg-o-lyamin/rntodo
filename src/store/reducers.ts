import {combineReducers} from 'redux';
import {Action, ActionType, TodosState, FetchStatus} from './types';

const DEFAULT_STATE: TodosState = {
  todos: {},
  requestStatus: FetchStatus.IDLE,
};

const todosReducer = (state = DEFAULT_STATE, action: Action): TodosState => {
  switch (action.type) {
    case ActionType.FetchTodosFailure:
      return {
        ...state,
        todos: [],
        requestStatus: FetchStatus.FAILURE,
      };
    case ActionType.FetchTodosSuccess:
      return {
        ...state,
        todos: action.todos,
        requestStatus: FetchStatus.SUCCESS,
      };
    case ActionType.ChangeTodo:
      return {
        ...state,
        todos: {...state.todos, [action.todo.id]: action.todo},
      };
    case ActionType.DeleteTodo:
      return {
        ...state,
        todos: Object.fromEntries(Object.entries(state.todos)
          .filter(([key, value]) => key != action.todo.id)),
      };
    default:
      return state;
  }
};
export default combineReducers({
  todos: todosReducer,
});
