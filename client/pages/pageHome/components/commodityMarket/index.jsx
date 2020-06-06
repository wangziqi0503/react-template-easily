import React, { useMemo, useEffect, useLayoutEffect, useCallback, useRef } from 'react'
import { connect } from 'dva'
import { filterSessionData, commonParams, getFilterSort, getFilterInput, isNotEmpty } from '@/common/utils/Common'
import Commodity from './components/commodity/commodity'
import FilterCommondity from './components/filterCommodity/filterCommodity'
import LoadState from './components/loadState/loadState'
import NoCommodity from './components/noCommodity/noCommodity'
import { CSSTransition } from 'react-transition-group'
import './index.scss'

const mapStateToProps = (state) => {
    return {
        defaultCar: state.homeInfo.defaultCar,
        skuData: state.commodiy.skuData,
        filterData: state.commodiy.filterData,
        showTag: state.commodiy.showTag,
        loadStatus: state.commodiy.loadStatus,
        isAll: state.commodiy.isAll,
        hasCommodity: state.commodiy.hasCommodity,
        commodityPageIndex: state.commodiy.commodityPageIndex
    }
}

const CommodityMarket = (props) => {
    const isAllFlag = useRef()
    const isPage = useRef()
    const isShowTag = useRef()
    const isFilterData = useRef()
    const filterSession = filterSessionData()
    const commonParam = commonParams()
    const defaultCar = props.defaultCar.size > 0 ? props.defaultCar.toJS() : null

    getFilterSort() // 获取商品的排序信息
    getFilterInput() // 商品价格筛选的input框内容
    let getParam = {}
    if (defaultCar) {
        getParam = {
            carButlerId: '',
            page: props.commodityPageIndex,
            pageSize: 20,
            modelId: defaultCar.modelId,
            cid3: defaultCar.cid3 || '',
            priceStart: filterSession && filterSession.priceStart ? filterSession.priceStart : '',
            priceEnd: filterSession && filterSession.priceEnd ? filterSession.priceEnd : '',
            brandIds: filterSession && filterSession.brandIds ? filterSession.brandIds : '',
            scene: filterSession && filterSession.scene ? filterSession.scene : 11,
            extAttrs: filterSession && filterSession.extAttrs ? filterSession.extAttrs : '',
            hasStock: true,
            sid: commonParam.sid || '',
            area: commonParam.area || '',
            area1: commonParam.area1 || '',
            area2: commonParam.area2 || '',
            area3: commonParam.area3 || '',
            area4: commonParam.area4 || '',
            clientVersion: commonParam.clientVersion || ''
        }
    }

    // 关闭更换商品弹窗
    const closeMaker = () => {
        props.dispatch({
            type: 'commodiy/setStatus',
            payload: false
        })
        props.dispatch({
            type: 'commodiy/setPage',
            payload: 0
        })
        props.dispatch({
            type: 'commodiy/setIsAll',
            payload: false
        })
        sessionStorage.removeItem('LOCAL_FILTER_DATA')
        sessionStorage.removeItem('LOCAL_PRICE_RANGE')
        sessionStorage.removeItem('LOCAL_SHOW_TAG')
    }

    // 获取筛选数据
    const getFilterData = () => {
        const filterStr = sessionStorage.getItem('LOCAL_FILTER_DATA') // 获取筛选数据
        if (isNotEmpty(filterStr)) {
            context.commit(FILTERDATA, JSON.parse(filterStr))
            return
        }
        const { cid3, carButlerId, modelId } = getParam
        const filterParam = { cid3, carButlerId, modelId }
        props.dispatch({
            type: 'commodiy/getShaixuan',
            payload: filterParam
        })
    }

    const handleScroll = () => {
        const element = document.getElementsByClassName('goods-list-data')[0]
        let scrollTop =
            element.scrollTop ||
            (document.documentElement && document.documentElement.scrollTop) ||
            document.body.scrollTop
        let scrollHeight =
            element.scrollHeight ||
            (document.documentElement && document.documentElement.scrollHeight) ||
            document.body.scrollHeight
        let offsetHeight = element.style.height || window.innerHeight

        // 回到顶部显示或者隐藏
        // console.log('scrollTop:', scrollTop, 'offsetHeight:', offsetHeight)
        // if (scrollTop > offsetHeight) {
        //     _this.backToTopShow = true
        // } else {
        //     _this.backToTopShow = false
        // }
        if (isAllFlag.current) {
            return
        } else {
            if (scrollTop + offsetHeight + 150 > scrollHeight) {
                let page = isPage.current
                let scene, extAttrs, brandIds
                // 获取排序参数
                for (let i = 0; i < isShowTag.current.length - 1; i++) {
                    let item = isShowTag.current[i]
                    if (i == 0 && item.tag) {
                        scene = 11
                    } else if (i == 1 && item.tag) {
                        scene = 6
                    } else if (i == 2 && item.tag) {
                        if (item.sort) {
                            scene = 3
                        } else {
                            scene = 2
                        }
                    }
                }
                const filterData =
                    isFilterData.current && isFilterData.current.size > 0 ? isFilterData.current.toJS() : null

                // 获取筛选参数
                for (let i = 0; i < filterData.length; i++) {
                    let item = filterData[i]
                    let subList = item.subList
                    if (i == 0) {
                        for (let j = 0; j < subList.length; j++) {
                            if (subList[j].checked) {
                                brandIds = subList[j].subId
                            }
                        }
                    } else {
                        let extA = item.NameId
                        let extB
                        for (let j = 0; j < subList.length; j++) {
                            if (subList[j].checked) {
                                extB = subList[j].subId
                                extAttrs.push(extA + '-' + extB)
                            }
                        }
                    }
                }

                extAttrs = extAttrs ? extAttrs.join(',') : ''
                brandIds = brandIds || ''
                scene = scene || 11

                const newData = { page, scene, brandIds, extAttrs }
                getParam = Object.assign(getParam, newData)
                // 加载更多商品数据
                props.dispatch({
                    type: 'commodiy/getSkuData',
                    payload: getParam,
                    isMore: true
                })
            }
        }
    }

    // 实时获取最新的状态
    useEffect(() => {
        isAllFlag.current = props.isAll
        isPage.current = props.commodityPageIndex
        isShowTag.current = props.showTag
        isFilterData.current = props.filterData
    }, [props.isAll, props.showTag, props.commodityPageIndex, props.filterData])

    useEffect(() => {
        props.dispatch({
            type: 'commodiy/getSkuData',
            payload: getParam
        })
        getFilterData()
        const element = document.getElementsByClassName('goods-list-data')[0]
        element.addEventListener('scroll', handleScroll)
        return () => {
            element.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const skuData = props.skuData && props.skuData.size > 0 ? props.skuData.toJS() : null

    return (
        <div className='commodity-container'>
            <div className='commodity-mask'></div>
            <CSSTransition in={true} timeout={1000} classNames='show' unmountOnExit appear={true}>
                <div className='content'>
                    <div className='close-btn' onClick={closeMaker}></div>
                    <FilterCommondity />
                    <div className='goods-list-data'>
                        <div className='goods-list'>
                            {skuData
                                ? skuData.map((item, index) => {
                                      return <Commodity data={item} key={index} />
                                  })
                                : null}
                        </div>
                        {!props.hasCommodity ? <NoCommodity /> : null}
                        <LoadState />
                    </div>
                </div>
            </CSSTransition>
        </div>
    )
}

export default connect(mapStateToProps)(CommodityMarket)
