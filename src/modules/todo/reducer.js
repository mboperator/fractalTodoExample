import { createModule } from 'redux-modules';
import { Map } from 'immutable';
import v4 from 'uuid';

const initialState = Map();

export const { actions, reducer, constants, name } = createModule({
  name: 'todo',
  initialState,
  transformations: [
    {
      action: 'INIT',
      payloadTypes: { },
      middleware: [
        (_, { payload, meta }) => {
          const id = v4();
          console.log('Middleware adding ID', id); // eslint-disable-line no-console
          return {
            payload: { id, ...payload },
            meta,
          };
        },
      ],
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
