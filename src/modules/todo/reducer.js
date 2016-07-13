import { createModule } from 'redux-modules';
import { loop, Effects } from 'redux-loop';
import { Map } from 'immutable';
import v4 from 'uuid';
import { set } from '../../utils/fp';

const initialState = Map();

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
        return loop(
          { ...state, description },
          Effects.none()
        );
      },
    },
    {
      type: 'DESTROY',
      reducer: state => loop({... state, deleted: true}, Effects.none()),
    },
  ],
});
