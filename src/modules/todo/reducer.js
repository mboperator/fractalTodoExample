import { createModule } from 'redux-modules';
import { loop, Effects } from 'redux-loop';
import { Map } from 'immutable';
import v4 from 'uuid';
import { set } from '../../utils/fp';

const initialState = Map();

const persist = (args) => new Promise(resolve => {
  console.log('PERSISTING:', args);
  resolve({type: 'todo/SET_SUCCESS', payload: args});
}).catch(e => console.error('err', err));

export const { actions, reducer, constants, name } = createModule({
  name: 'todo',
  initialState,
  transformations: [
    {
      type: 'INIT',
      middleware: [
        (_, { payload, meta }) => ({
          payload: { id: v4(), ...payload },
          meta,
        }),
      ],
      reducer: (state, {payload}) => {
        return loop(
          payload || state,
          Effects.none()
        )
      },
    },
    {
      type: 'SET_DESCRIPTION',
      reducer: (state, {payload: { description }}) => {
        const newState = { ...state, description, loading: true };
        return loop(
          newState,
          Effects.promise(persist, newState)
        );
      },
    },
    {
      type: 'SET_SUCCESS',
      reducer: state => {
        debugger;
        return loop({...state, loading: false}, Effects.none());
      },
    },
    {
      type: 'DESTROY',
      reducer: state => loop({... state, deleted: true}, Effects.none()),
    },
  ],
});
