import { compose } from 'redux';
import { install } from 'redux-loop';
import { fromJS, Map } from 'immutable';
import createLogger from 'redux-logger';

const logger = createLogger({
  stateTransformer: object => fromJS(object).toJS(),
  actionTransformer: object => fromJS(object).toJS(),
  collapsed: true,
  logErrors: false,
});

export default function generateStore() {
  const store = createStore(
    (state = Map()) => state,
    compose(applyMiddleware(logger), install())
  );
}
