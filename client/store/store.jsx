/**
 * @file store.js
 * @author wangziqi
 * @date 2017/1/11
 * redux store file
 */

import * as Redux from 'redux';
import ReduxThunk from 'redux-thunk';
import mainReducer from '../reducers/mainReducer.jsx';

const { createStore, applyMiddleware, compose } = Redux;


const enhancer = compose(
  applyMiddleware(ReduxThunk),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f,
  // devTools({
  //     name: 'blackhole',
  //     realtime: true
  // })
);

const store = createStore(mainReducer, enhancer);
export default store;
