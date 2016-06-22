import React, { Component } from 'react';
import { ModuleProvider } from 'redux-modules';
import generateStore from './store';
import TodoHandler from './handlers/TodoHandler';
// import todoSaga from './sagas/todos';

const store = generateStore();
// store.runSaga(todoSaga);

export default class App extends Component {
  render() {
    return (
      <ModuleProvider store={store}>
        <TodoHandler/>
      </ModuleProvider>
    );
  }
}
