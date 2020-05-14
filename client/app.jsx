/**
 * @file app.jsx
 * @desc 入口
 * @author 杨超
 * @data 2017/05/25
 * @update 2017/12/20
 */

/** lib * */
import * as React from 'react'
import { Router } from 'dva/router'
import RouterView from './routes/RouterView.jsx'
import routes from './routes/routes'

const RouterConfig = ({ history }) => {
    return (
        <Router history={history}>
            <RouterView routes={routes}></RouterView>
        </Router>
    )
}

export default RouterConfig
