/*
 * @Author: wangziqi
 * @Date: 2020-05-17 20:36:58
 * @LastEditTime: 2020-06-06 18:46:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-template-easily/client/models/pageHome/carListModel.js
 */
import { setDefaultCarData, getSkuData, getShaiXuanData } from '../../api/home'
import { isNotEmpty } from '../../common/utils/Common'
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
        ],
        skuData: [], // sku数据
        filterData: [], // 筛选商品数据
        commodityPageIndex: 0, // 当前分页页码
        loadStatus: false, // 加载数据中
        isAll: false, // 当前sku是否已经全部加载完成
        commodiyStatus: false, // 是否展示更换商品模块
        priceRange: {}
    },
    effects: {
        *getSkuData({ payload, isMore }, { call, put, select }) {
            const flag = yield select((state) => state.commodiy.loadStatus)
            const isAll = yield select((state) => state.commodiy.isAll)
            console.log('payload', payload, isAll)
            if (!flag && !isAll) {
                console.log('get in')
                let pageIndex = yield select((state) => state.commodiy.commodityPageIndex)
                let pageSize = 20
                yield put({ type: 'setLoadStatus', payload: true })
                yield put({ type: 'setPage', payload: ++pageIndex })
                payload.page = pageIndex // 获取页码数
                const res = yield call(getSkuData, payload)
                let newArr = []
                // 是否是加载更多
                if (isMore) {
                    let skuData = yield select((state) => state.commodiy.skuData)
                    newArr = skuData.toJS().concat(res.data.data)
                } else {
                    newArr = res.data.data
                }
                yield put({ type: 'setSkuData', payload: newArr })
                yield put({ type: 'setLoadStatus', payload: false })

                // 判断数据是否已经全部加载
                if (res.data.totalCount <= pageIndex * pageSize) {
                    yield put({ type: 'setIsAll', payload: true })
                }
            }
        },
        *getShaixuan({ payload }, { call, put }) {
            const res = yield call(getShaiXuanData, payload)
            if (res.code == 0 && isNotEmpty(res.data)) {
                var brandNameArr = [],
                    brandIdArr = [],
                    extsArr = [],
                    values = [],
                    tempbrandArr = []
                tempbrandArr = res.data.brandAgg != null ? res.data.brandAgg : []
                extsArr = res.data.extAgg != null ? res.data.extAgg : []

                for (var a = 0; a < tempbrandArr.length; a++) {
                    brandIdArr.push(tempbrandArr[a].fieldId)
                    brandNameArr.push(tempbrandArr[a].field)
                }
                //筛选
                var tempData = {
                    //大分类
                    Name: '',
                    NameId: '',
                    order: '',
                    subList: []
                }

                tempData.Name = '品牌'
                tempData.order = '000001'
                tempData.NameId = '品牌'
                tempData.tag = 0 //0表示收起，1表示展开

                for (let j = 0; j < brandNameArr.length; j++) {
                    // 更换商品的筛选项中的品牌列表
                    let tempSubData = {
                        //小分类
                        subName: '',
                        subId: '',
                        checked: false
                    }
                    tempSubData.subName = brandNameArr[j]
                    tempSubData.subId = brandIdArr[j] //selecttype为品牌id
                    if (isNotEmpty(tempSubData.subName)) {
                        tempData.subList.push(tempSubData)
                    }
                }
                values.push(tempData) //首位插入品牌

                for (let i = 0; i < extsArr.length; i++) {
                    // 获取包装、材质、类型等筛选条件
                    let tempData = {
                        Name: '',
                        NameId: '',
                        order: '',
                        tag: 0,
                        subList: []
                    }
                    tempData.Name = extsArr[i].field
                    if (isNotEmpty(extsArr[i].order)) {
                        tempData.order = extsArr[i].order
                    } else {
                        tempData.order = 5000 //设置一个最大值 处理order为null 排序问题
                    }

                    tempData.NameId = extsArr[i].fieldId
                    var subArr = extsArr[i].subAggList

                    for (var k = 0; k < subArr.length; k++) {
                        // 更换商品的包装、材质、类型等描述
                        let tempSubData = {
                            subName: '',
                            subId: '',
                            checked: false
                        }
                        tempSubData.subName = subArr[k].field
                        tempSubData.subId = subArr[k].fieldId
                        if (isNotEmpty(tempSubData.subName)) {
                            tempData.subList.push(tempSubData)
                        }
                    }
                    values.push(tempData)
                }
                if (values.length > 0) {
                    // 筛选条件存在
                    let tempValuesArr = values.sort(
                        //数组排序
                        function (a, b) {
                            if (parseInt(a.order) < parseInt(b.order)) {
                                return -1
                            }
                            if (parseInt(a.order) > parseInt(b.order)) {
                                return 1
                            }
                            return 0
                        }
                    )
                    yield put({ type: 'setFilterData', payload: tempValuesArr })
                    // setFilterData(tempValuesArr)
                    // console.log(tempValuesArr)
                    // context.commit(FILTERDATA, tempValuesArr)
                    // context.commit(UPDATELOADSTATE, false)
                    // context.commit('updateCommodityTimeout', true)
                }
            }
        }
    },
    reducers: {
        // 设置导航
        setShowTag(state, { payload }) {
            return {
                ...state,
                showTag: payload
            }
        },
        // 设置当前展示数据
        setSkuData(state, { payload }) {
            console.log('payload', payload)
            return {
                ...state,
                skuData: fromJS(payload)
            }
        },
        // 设置筛选条件数据
        setFilterData(state, { payload }) {
            return {
                ...state,
                filterData: fromJS(payload)
            }
        },
        // 展示隐藏当前模块
        setStatus(state, { payload }) {
            return {
                ...state,
                commodiyStatus: payload
            }
        },
        // 设置当前页码数
        setPage(state, { payload }) {
            return {
                ...state,
                commodityPageIndex: payload
            }
        },
        // 设置当前是否可以加载新数据开关
        setLoadStatus(state, { payload }) {
            return {
                ...state,
                loadStatus: payload
            }
        },
        // 设置加载完全部数据开关状态
        setIsAll(state, { payload }) {
            return {
                ...state,
                isAll: payload
            }
        }
    }
}
