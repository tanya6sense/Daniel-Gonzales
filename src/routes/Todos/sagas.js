import { put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import moment from 'moment';
import { actions, actionTypes } from './modules';

const { LOAD_TODOS } = actionTypes;
const { loadFail, loadSuccess } = actions;

export function* loadTodos() {
  try {
    // mimic server
    yield delay(2000);

    const todos = [
      { id: 1, name: 'Find the meaning of life', completed: true },
      { id: 17, name: 'Call Mom', completed: false },
      { id: 18, name: 'Call Sister for birthday', completed: false },
      { id: 19, name: 'Organize secure docs', completed: false },
      { id: 20, name: 'Apply for jobs', completed: false },
    ].map((t) => ({ ...t, created: moment().subtract(1, 'day').format('DD-MM-YYYY') }));

    yield put(loadSuccess(todos));
  } catch (e) {
    yield put(loadFail(e));
  }
}

/**
 * Saga manages page-load calls
 */
export function* watchTodos() {
  yield takeLatest(LOAD_TODOS, loadTodos);
}

export default [
  watchTodos,
];
