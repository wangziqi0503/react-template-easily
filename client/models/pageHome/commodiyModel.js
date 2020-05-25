/*
 * @Author: wangziqi
 * @Date: 2020-05-17 20:36:58
 * @LastEditTime: 2020-05-25 22:54:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-template-easily/client/models/pageHome/carListModel.js
 */
import { setDefaultCarData } from '../../api/home'
import { fromJS } from 'immutable'
export default {
    namespace: 'commodiy',
    state: {
        showTag: [
            {
                name: '综合',
                tag: true
            },
            {
                name: '销量',
                tag: false
            },
            {
                name: '价格',
                tag: false,
                sort: 0
            },
            {
                name: '筛选',
                tag: false,
                sort: 0
            }
        ]
    },
    effects: {},
    reducers: {
        setShowTag(state, { payload }) {
            return {
                ...state,
                showTag: payload
            }
        }
    }
}
