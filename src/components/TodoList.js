import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { List } from 'immutable';
import TodoItem from './TodoItem';

const { array, func, number, shape } = PropTypes;

export default class TodoList extends React.Component {
  static propTypes = {
    todos: shape({
      collection: array,
      actions: shape({
        addToList: func,
        removeFromList: func,
        updateInList: func,
      }),
    }),
  };

  render() {
    const { title, todos: todoProps = {} } = this.props;
    const { collection = [], actions } = todoProps ;

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
            <TodoItem {...todo} />
          )}
        </ul>
      </div>
    );
  }
}
