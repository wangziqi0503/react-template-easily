/*
 * @Author: wangziqi
 * @Date: 2020-05-15 22:29:49
 * @LastEditTime: 2020-05-17 20:43:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-template-easily/client/index.js
 */

import dva from 'dva'
import App from './app'
import createLoading from 'dva-loading'
import './common/utils/Common.jsx'
/** * common stylesheet file ** */
import './common/style/_reset.scss'
import './common/style/_common.scss'
// import router from './client/routes'

//初始化dva
const app = dva()

// plugins
app.use(
    createLoading({
        globale: false,
        models: {
            order: false
        }
    })
)

// model
// app.model(require('./models/pageHome/homeModel').default)
require('./models/pageHome').default.forEach((key) => app.model(key.default))
// route
app.router(App)

// start
app.start('#container')
