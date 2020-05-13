/**
 * @file store.js
 * @author wangziqi
 * @date 2017/1/11
 * redux store file
 */

import * as Redux from 'redux'
import ReduxThunk from 'redux-thunk'
import mainReducer from '../reducers/mainReducer.jsx'
import { routerMiddleware } from 'react-router-redux'

const { createStore, applyMiddleware, compose } = Redux

let createHistory = require('history').createHashHistory
let history = createHistory() // 初始化history
let routerWare = routerMiddleware(history)

const enhancer = compose(
    applyMiddleware(ReduxThunk, routerWare),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
    // devTools({
    //     name: 'blackhole',
    //     realtime: true
    // })
)

const store = createStore(mainReducer, enhancer)
export default store
