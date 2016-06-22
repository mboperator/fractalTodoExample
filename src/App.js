import React, { Component } from 'react';
import { ModuleProvider } from 'redux-modules';
import generateStore from './store';
// import todoSaga from './sagas/todos';

const store = generateStore();
// store.runSaga(todoSaga);

export default class App extends Component {
  render() {
    return (
      <ModuleProvider store={store}>
        <h1>Hello, squirrels.</h1>
      </ModuleProvider>
    );
  }
}
