import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './reducers';
import { requestMiddleware } from './redux-request';

requestMiddleware.on.fail = (e) => {
  if (e.response) {
    return e.response;
  }
  throw e;
};

const middleware = [
  requestMiddleware,
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware)),
);

window.store = store;

export default store;
