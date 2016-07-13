import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { List } from 'immutable';
import TodoItem from './TodoItem';
import { connectModule } from 'redux-modules';
import * as todoModule from '../modules/todos/reducer';

const { array, func, number, shape } = PropTypes;

const selector = state => { return { todoList: { collection: state.todoList } } };

@connectModule(selector, todoModule)
export default class TodoList extends React.Component {
  static propTypes = {
    todoList: shape({
      collection: array,
    }),
    actions: shape({
      addToList: func,
      removeFromList: func,
      updateInList: func,
    }),
  };

  render() {
    const { title, todoList: todoProps = {}, actions } = this.props;
    const { collection = [] } = todoProps ;

    return (
      <div>
        <h1>{title}</h1>

        <div>
          <label>Description</label>
          <input ref='description'/>

          <input
            type='button'
            value='Create'
            onClick={() => {
              actions.addToList({
                params: {
                  description: findDOMNode(this.refs.description).value,
                }
              })
            }}
          />
        </div>

        <ul>
          {collection.map(todo =>
            <TodoItem {...todo}
              dispatch={action => actions.performInList({id: todo.id, action})}
            />
          )}
        </ul>
      </div>
    );
  }
}

