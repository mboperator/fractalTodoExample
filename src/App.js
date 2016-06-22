import React, { Component } from 'react';
import { ModuleProvider } from 'redux-modules';
import store from './store';

export default class App extends Component {
  render() {
    return (
      <ModuleProvider store={store}>
        <h1>Hello, squirrels.</h1>
      </ModuleProvider>
    );
  }
}
