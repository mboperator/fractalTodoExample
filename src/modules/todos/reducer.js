import listReducer from '../list/reducer';
import {
  reducer as todoReducer,
  actions as todoActions,
  name as todoName,
} from '../todo/reducer';

export const { actions, reducer, constants, name } =
  listReducer({
    reducer: todoReducer,
    actions: todoActions,
    name: todoName,
  });
