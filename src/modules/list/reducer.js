import { createModule } from 'redux-modules';
import { loop, Effects } from 'redux-loop';
import { List } from 'immutable';
import { get, getIn } from '../../utils/fp';

export default function list({reducer, actions, name}) {
  return createModule({
    name: `${name}List`,
    initialState: List(),
    transformations: [
      {
        type: 'INIT',
        payloadTypes: { },
        reducer: (state, {payload: collection}) => {
          const { init } = actions;
          return loop(
            List(collection.map( item => {
              const [nState] = reducer(undefined, init(item));
              return nState;
            })),
            Effects.none()
          );
        },
      },
      {
        type: 'PERFORM_IN_LIST',
        payloadTypes: { },
        reducer: (state, {payload: {id, action}}) => {
          const idx = state.findIndex( item => get('id')(item) === id);
          const [nState] = reducer(state.get(idx), action);
          return loop(
            state.set(idx, nState),
            Effects.none()
          );
        },
      },
      {
        type: 'ADD_TO_LIST',
        payloadTypes: { },
        reducer: (state, {payload: {params}}) => {
          const [nState] = reducer(undefined, actions.init(params));
          return loop(
            state.push(nState),
            Effects.none()
          );
        },
      },
      {
        type: 'REMOVE_FROM_LIST',
        payloadTypes: { },
        reducer: (state, {payload: {id}}) => {
          const idx = state.findIndex( item => get('id')(item) === id);
          reducer(state.get(idx), actions.destroy());
          return loop(
            state.remove(idx),
            Effects.none()
          );
        },
      },
    ],
  });
}
