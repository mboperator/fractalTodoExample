import { takeLatest } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import todos from '../modules/todos';

const { constants } = todos;

function* hydrate() {
  try {
    const todos = yield storage.get('fractal_todos');
    if (todos) {
      yield put(todos.actions.hydrateSuccess(JSON.parse(todos)));
    }
  } catch (e) {
    yield put(todos.actions.hydrateError(e));
  }
}

function* persist() {
  try {
    const todos = yield select(state => state.todos);
    yield storage.set('fractal_todos', JSON.stringify(todos.toJS()));
  } catch (e) {
    console.log('Persist!', e);
  }
}

export default function* todosSaga() {
  yield [
    takeLatest(constants.hydrate, hydrate),
    takeLatest([
      constants.create,
      constants.update,
      constants.destroy,
    ], persist),
  ];
}
