import { createSelector } from 'reselect';
import { filter } from 'lodash';

const baseSelector = (state) => state.todos;

const todosSelector = (state) => state.todos.todos;

export const incompleteTodosSelector = createSelector(
  todosSelector,
  (todos) => filter(todos, (todo) => !todo.completed)
);

// BIG DISCLAIMER - this is a frontend hack to mimic pagination
// Pagination should typically be managed by the server, not by a selector that limits
// the results
export const contextSelector = createSelector(
  baseSelector,
  incompleteTodosSelector,
  (manage, todos) => ({
    loading: manage.loading,
    loaded: manage.loaded,
    error: manage.error,
    alert: manage.addError,
    count: todos.length,
  })
);

export const completedTodosSelector = createSelector(
  todosSelector,
  (todos) => todos.filter((todo) => todo.completed)
);
