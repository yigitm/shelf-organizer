import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import isbnReducer from './ISBN/isbn';

const reducer = combineReducers({
  isbnReducer,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
