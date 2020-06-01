import React, { useEffect, useState } from 'react'
import { connect } from 'dva'
import { updateCommodityData, setSort } from '@/common/utils/Common'
import './index.scss'

const mapStateToProps = (state) => {
    return {
        showTag: state.commodiy.showTag,
        defaultCar: state.homeInfo.defaultCar
    }
}

const FilterCommondity = (props) => {
    const showTag = [...props.showTag]
    const defaultCar = props.defaultCar.size > 0 ? props.defaultCar.toJS() : null   
    const sessionTag = JSON.parse(sessionStorage.getItem('LOCAL_SHOW_TAG'))
    if(sessionTag){
        useEffect(() => {
            props.dispatch({
                type: 'commodiy/setShowTag',
                payload: sessionTag
            })
        }, [])
    }

    const filterGoods = (index) => {
        for (let i = 0; i < showTag.length; i++) {
            if (i == index) {
                if (i > 2) {
                    showTag[i].sort = !showTag[i].sort
                }
                if (i == 2) {
                    if (showTag[i].tag) {
                        showTag[i].sort = !showTag[i].sort
                    } else {
                        showTag[i].sort = false
                    }
                }
                showTag[i].tag = true
            } else {
                showTag[i].tag = false
                if (i > 2) {
                    showTag[i].sort = false
                }
            }
        }

        setSort(showTag)

        props.dispatch({
            type: 'commodiy/setShowTag',
            payload: showTag
        })
        // this.$emit('update-sort', this.showTag)

        if (index < 3) {
            props.dispatch({
                type: 'commodiy/setSkuData',
                payload: []
            })
            props.dispatch({
                type: 'commodiy/getSkuData',
                payload: updateCommodityData(defaultCar)
            })
            // this.$emit('update-sku-data', updateCommodityData(_this.commodityParams))
        }
    }

    return (
        <div className='filter-view'>
            <div className='title'>选择商品</div>
            <div className='filter'>
                <ul>
                    {/* 前两个筛选条件为：综合、销量 */}
                    {showTag.map((item, index) => {
                        return (
                            <li
                                className={`filter-left filter-item ${item.tag ? 'red' : ''} ${index >= 2 ? 'up' : ''}`}
                                key={index}
                                onClick={() => {
                                    filterGoods(index)
                                }}>
                                <span>{item.name}</span>
                                {index >= 2 ? (
                                    <div className='arrow'>
                                        {item.tag && item.sort ? (
                                            <img
                                                className='arrow-img'
                                                src={require('../../../../../../common/assets/upChecked.png')}
                                                alt=''
                                            />
                                        ) : null}
                                        {item.tag && !item.sort ? (
                                            <img
                                                className='arrow-img'
                                                src={require('../../../../../../common/assets/downChecked.png')}
                                                alt=''
                                            />
                                        ) : null}
                                        {!item.tag && !item.sort ? (
                                            <img
                                                className='arrow-img'
                                                src={require('../../../../../../common/assets/down.png')}
                                                alt=''
                                            />
                                        ) : null}
                                    </div>
                                ) : null}
                            </li>
                        )
                    })}
                </ul>
            </div>
            {showTag[3] ? (
                <div className={`brand-list ${!showTag[3].sort ? 'hide' : ''}`}>
                    <div className='brand-content'>
                        <div className='content-info'>
                            <div className='list'>
                                <ul>
                                    <li className='list-item'>
                                        {/* 价格的筛选*/}
                                        <div className='price'>
                                            <div className='price-str'>价格范围</div>
                                            <div className='price-input'>
                                                <input type='tel' maxLength='10' placeholder='最低价' className='low' />
                                                <span>————</span>
                                                <input
                                                    type='tel'
                                                    maxLength='10'
                                                    placeholder='最高价'
                                                    className='high'
                                                />
                                            </div>
                                        </div>
                                    </li>
                                    <li className='list-item'>
                                        {/*其他筛选条件*/}
                                        <div className='brand filter-classify'>
                                            <span className='filter-name'>333</span>
                                            <div className='more-btn-up'>
                                                全部
                                                <span className='icon-up'>
                                                    <img
                                                        className='img'
                                                        src={require('../../../../../../common/assets/down.png')}
                                                        alt=''
                                                    />
                                                    <img
                                                        className='img'
                                                        src={require('../../../../../../common/assets/up.png')}
                                                        alt=''
                                                    />
                                                </span>
                                            </div>
                                        </div>
                                        <div className='sub-view' style={{ display: 'inline-block' }}>
                                            <ul>
                                                <li className='sub-item'>
                                                    <span></span>
                                                </li>
                                            </ul>
                                            <ul>
                                                <li className='sub-item'>
                                                    <span></span>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='bottom-bar'>
                            <div className='reset'> 重置</div>
                            <div className='ensure'> 确定</div>
                        </div>
                    </div>
                </div>
            ) : null}
            {/* <Toast v-if='toastData.visible'></Toast> */}
        </div>
    )
}

export default connect(mapStateToProps)(FilterCommondity)
