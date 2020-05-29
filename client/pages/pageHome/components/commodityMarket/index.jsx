import React, { useMemo, useEffect } from 'react'
import { connect } from 'dva'
import Commodity from './components/commodity/commodity'
import './index.scss'
import FilterCommondity from './components/filterCommodity/filterCommodity'

const mapStateToProps = (state) => {
    return {
        skuData: state.commodiy.skuData,
        defaultCar: state.homeInfo.defaultCar
    }
}

const CommodityMarket = (props) => {
    console.log(props)
    useMemo(() => {
        props.dispatch({
            type: 'commodiy/getSkuData'
        })
    }, [])

    const skuData = props.skuData.size > 0 ? props.skuData.toJS() : null

    return (
        <div className='commodity-container'>
            <div className='commodity-mask'></div>
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
        </div>
    )
}

export default connect(mapStateToProps)(CommodityMarket)
