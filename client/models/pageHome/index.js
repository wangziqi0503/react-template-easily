/*
 * @Author: wangziqi
 * @Date: 2020-05-17 20:47:55
 * @LastEditTime: 2020-05-17 20:55:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-template-easily/client/models/pageHome/index.js
 */

const context = require.context('./', false, /\.js$/)
export default context
    .keys()
    .filter((item) => item != './index.js')
    .map((key) => context(key))
