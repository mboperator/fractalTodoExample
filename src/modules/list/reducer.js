import { createModule } from 'redux-modules';
import { List } from 'immutable';

export default function list({reducer, actions, name}) {
  return createModule({
    name: `${name}List`,
    initialState: List(),
    transformations: [
      {
        action: 'INIT',
        payloadTypes: { },
        reducer: (state, {payload: collection}) => {
          const { init } = actions;
          return List(collection.map( item => reducer(undefined, init(item))));
        },
      },
      {
        action: 'PERFORM_IN_LIST',
        payloadTypes: { },
        reducer: (state, {payload: {id, action}}) => {
          const idx = state.findIndex( item => item.get('id') === id);
          return state.set(idx, reducer(state.get(idx), action));
        },
      },
      {
        action: 'ADD_TO_LIST',
        payloadTypes: { },
        reducer: (state, {payload: {params}}) => {
          return state.push(reducer(undefined, actions.init(params)));
        },
      },
      {
        action: 'REMOVE_FROM_LIST',
        payloadTypes: { },
        reducer: (state, {payload: {id}}) => {
          const idx = state.findIndex( item => item.get('id') === id);
          reducer(state.get(idx), actions.destroy());
          return state.remove(idx);
        },
      },
    ],
  });
}
