import React from 'react';
import { connectModule } from 'redux-modules';
import * as todoModule from '../modules/todo/reducer';


const TodoItem = ({id, title, description, checked, todo: { actions }}) =>
  <li>
    <div className="checkbox">
      <input
        onChange={e =>
          actions.setDescription({
            description: 'Bob',
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
      <button onClick={() => actions.destroy()}>
        Delete Todo
      </button>
    </aside>
  </li>

export default connectModule(state => {return {}}, todoModule)(TodoItem);
