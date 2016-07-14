import { createModule } from 'redux-modules';
import { loop, Effects } from 'redux-loop';
import { List } from 'immutable';
import { get, getIn } from '../../utils/fp';
import storage from '../../services/storage';

export default function list({reducer, actions, name}) {
  const module = createModule({
    name: `${name}List`,
    initialState: List(),
    transformations: [
      {
        type: 'INIT',
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
        reducer: (state, {payload: {id, action}}) => {
          const idx = state.findIndex( item => get('id')(item) === id);
          const [nState, nEffect] = reducer(state.get(idx), action);
          const newParentState = state.set(idx, nState).set('_persisting', true);
          return loop(
            newParentState,
            Effects.lift(nEffect, newAction => {
              debugger;
              return {type: `${name}List/PERFORM_IN_LIST`, payload: { id, action: newAction }};
            })
          );
        },
      },
      {
        type: 'PERSIST_SUCCESS',
        reducer: state => loop(
          state.set('_persisting', false),
          Effects.none()
        ),
      },
      {
        type: 'ADD_TO_LIST',
        reducer: (state, {payload: {params}}) => {
          const [nState] = reducer(undefined, actions.init(params));
          const newParentState = state.push(nState);
          return loop(
            newParentState,
            Effects.promise(persist, newParentState)
          );
        },
      },
      {
        type: 'REMOVE_FROM_LIST',
        reducer: (state, {payload: {id}}) => {
          const idx = state.findIndex( item => get('id')(item) === id);
          const newState = state.remove(idx);
          return loop(
            newState,
            Effects.promise(persist, newParentState)
          );
        },
      },
    ],
  });

  const persist = state => new Promise(
    resolve =>
      storage
      .set('fractalTodos', state.toJS())
      .then(() => {
        const action = module.actions.persistSuccess({});
        resolve(action);
      })
    )

  return module;
}
