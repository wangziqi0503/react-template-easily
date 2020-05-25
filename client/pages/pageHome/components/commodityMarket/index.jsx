import React from 'react'
import './index.scss'
import FilterCommondity from './components/filterCommodity/index'

const CommodityMarket = () => {
    return (
        <div className='commodity-container'>
            <div className='commodity-mask'></div>
            <div className='content'>
                <div className='close-btn'></div>
                <FilterCommondity />
                <div className='goods-list-data'>
                    <div className='goods-list'></div>
                </div>
            </div>
        </div>
    )
}

export default CommodityMarket
