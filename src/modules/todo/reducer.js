import { createModule } from 'redux-modules';
import { Map } from 'immutable';

const initialState = Map();

export const { actions, reducer, constants, name } = createModule({
  name: 'todo',
  initialState,
  transformations: [
    {
      action: 'INIT',
      payloadTypes: { },
      reducer: (state, {payload}) => {
        return payload || state;
      },
    },
    {
      action: 'SET_NAME',
      payloadTypes: { },
      reducer: (state, {payload}) => {
        return state.set('name', payload.name);
      },
    },

  ],
});
