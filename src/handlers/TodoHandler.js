import React from 'react';
import TodoList from '../components/TodoList';
import { connectModule } from 'redux-modules';
import * as todoModule from '../modules/todos/reducer';

const selector = state => { return { todoList: { collection: state.todoList } } };

class TodoHandler extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TodoList todos={this.props.todoList}/>
    );
  }
}

export default connectModule(selector, todoModule)(TodoHandler);
