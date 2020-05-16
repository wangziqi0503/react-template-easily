/*
 * @Author: wangziqi
 * @Date: 2020-05-15 21:49:21
 * @LastEditTime: 2020-05-16 17:59:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /自助保养 /react-template-easily/client/routes/routes.js
 */
import Home from '../pages/pageHome/home'
import Manual from '../pages/Manual/index'

export default [
    {
        path: '/',
        component: Home
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/manual',
        component: Manual
    }
]
