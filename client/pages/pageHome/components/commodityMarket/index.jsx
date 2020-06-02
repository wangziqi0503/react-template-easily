import React, { useMemo, useEffect, useLayoutEffect } from 'react'
import { connect } from 'dva'
import { filterSessionData, commonParams, getFilterSort } from '@/common/utils/Common'
import Commodity from './components/commodity/commodity'
import FilterCommondity from './components/filterCommodity/filterCommodity'
import { CSSTransition } from 'react-transition-group'
import './index.scss'

const mapStateToProps = (state) => {
    return {
        defaultCar: state.homeInfo.defaultCar,
        loading: state.loading,
        skuData: state.commodiy.skuData,
        showTag: state.commodiy.showTag,
        commodityPageIndex: state.commodiy.commodityPageIndex
    }
}

const CommodityMarket = (props) => {
    const isFetch = props.loading.effects['commodiy/getSkuData']
    const filterSession = filterSessionData()
    const commonParam = commonParams()
    getFilterSort()
    const defaultCar = props.defaultCar.size > 0 ? props.defaultCar.toJS() : null
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

    const closeMaker = () => {
        props.dispatch({
            type: 'commodiy/setStatus',
            payload: false
        })
    }

    useEffect(() => {
        props.dispatch({
            type: 'commodiy/getSkuData',
            payload: getParam
        })
        const element = document.getElementsByClassName('goods-list-data')[0]
        element.addEventListener(
            'scroll',
            () => {
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

                if (scrollTop + offsetHeight + 150 > scrollHeight) {
                    let page = props.commodityPageIndex
                    console.log('page===', page)
                    page += 1
                    props.dispatch({
                        type: 'commodiy/setPage',
                        payload: page
                    })

                    let scene, extAttrs, brandIds
                    // 获取排序参数
                    for (let i = 0; i < props.showTag.length - 1; i++) {
                        let item = props.showTag[i]
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

                    // 获取筛选参数
                    // for (let i = 0; i < _this.filterData.length; i++) {
                    //     let item = _this.filterData[i]
                    //     let subList = item.subList
                    //     if (i == 0) {
                    //         for (let j = 0; j < subList.length; j++) {
                    //             if (subList[j].checked) {
                    //                 brandIds = subList[j].subId
                    //             }
                    //         }
                    //     } else {
                    //         let extA = item.NameId
                    //         let extB
                    //         for (let j = 0; j < subList.length; j++) {
                    //             if (subList[j].checked) {
                    //                 extB = subList[j].subId
                    //                 extAttrs.push(extA + '-' + extB)
                    //             }
                    //         }
                    //     }
                    // }
                    const newData = { page, scene }
                    getParam = Object.assign(getParam, newData)
                    console.log('getParam', getParam)
                    // 加载更多商品数据
                    props.dispatch({
                        type: 'commodiy/getSkuData',
                        payload: getParam,
                        isMore: true
                    })
                }
            },
            true
        )
    }, [props.showTag, props.commodityPageIndex])

    const skuData = props.skuData.size > 0 ? props.skuData.toJS() : null

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
                    </div>
                </div>
            </CSSTransition>
        </div>
    )
}

export default connect(mapStateToProps)(CommodityMarket)
