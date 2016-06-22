import React from 'react';

const TodoItem = ({id, title, description, checked}) =>
  <li>
    <div className="checkbox">
      <input
        onChange={e =>
          actions.update({
            index: i,
            todo: {checked: e.target.checked},
          })
        }
        type='checkbox'
        checked={checked}
      />
    </div>
    <p>
      {description}
    </p>
    <aside>
      <button onClick={() => actions.destroy({index: i})}>
        Delete Todo
      </button>
    </aside>
  </li>

export default TodoItem;
