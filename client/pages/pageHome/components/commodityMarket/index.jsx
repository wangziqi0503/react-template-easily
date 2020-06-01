import React, { useMemo, useEffect } from 'react'
import { connect } from 'dva'
import { filterSessionData, commonParams, getFilterSort } from '@/common/utils/Common'
import Commodity from './components/commodity/commodity'
import FilterCommondity from './components/filterCommodity/filterCommodity'
import { CSSTransition } from 'react-transition-group'
import './index.scss'

const mapStateToProps = (state) => {
    return {
        defaultCar: state.homeInfo.defaultCar,
        skuData: state.commodiy.skuData
    }
}

const CommodityMarket = (props) => {
    const filterSession = filterSessionData()
    const commonParam = commonParams()
    getFilterSort()
    const defaultCar = props.defaultCar.size > 0 ? props.defaultCar.toJS() : null
    let getParam = {}
    if (defaultCar) {
        getParam = {
            carButlerId: '',
            page: 1,
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

    useMemo(() => {
        props.dispatch({
            type: 'commodiy/getSkuData',
            payload: getParam
        })
    }, [])

    const skuData = props.skuData.size > 0 ? props.skuData.toJS() : null

    return (
        <div className='commodity-container'>
            <div className='commodity-mask'></div>
            <CSSTransition in={true} timeout={1000} classNames='show' unmountOnExit appear={true}>
                <div className='content'>
                    <div className='close-btn'></div>
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
