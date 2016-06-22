import React from 'react';
import TodoList from '../components/TodoList';

export default class TodoHandler extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TodoList/>
    );
  }
}
