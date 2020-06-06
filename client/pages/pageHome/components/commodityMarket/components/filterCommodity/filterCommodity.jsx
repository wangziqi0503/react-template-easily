import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'dva'
import { updateCommodityData, setSort, setPrice } from '@/common/utils/Common'
import './index.scss'

const mapStateToProps = (state) => {
    return {
        showTag: state.commodiy.showTag,
        defaultCar: state.homeInfo.defaultCar,
        filterData: state.commodiy.filterData
    }
}

const FilterCommondity = (props) => {
    const showTag = [...props.showTag]
    const defaultCar = props.defaultCar.size > 0 ? props.defaultCar.toJS() : null
    const filterData = props.filterData.size > 0 ? props.filterData.toJS() : null
    const low = useRef(null)
    const high = useRef(null)
    const sessionTag = JSON.parse(sessionStorage.getItem('LOCAL_SHOW_TAG'))
    if (sessionTag) {
        useEffect(() => {
            props.dispatch({
                type: 'commodiy/setShowTag',
                payload: sessionTag
            })
        }, [])
    }

    // 重置数据时调用
    const resetData = () => {
        props.dispatch({
            type: 'commodiy/setPage',
            payload: 0
        })
        props.dispatch({
            type: 'commodiy/setIsAll',
            payload: false
        })
        props.dispatch({
            type: 'commodiy/setSkuData',
            payload: []
        })
        props.dispatch({
            type: 'commodiy/getSkuData',
            payload: updateCommodityData(defaultCar)
        })
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

        if (index < 3) {
            resetData()
        }
    }

    // 筛选条件是展开还是收起，true表示展开，false表示收起
    const showAll = (index) => {
        filterData[index].tag = !filterData[index].tag
        props.dispatch({
            type: 'commodiy/setFilterData',
            payload: filterData
        })
    }

    // 筛选项的品牌等是否选中
    const changeChecked = (index, subIndex) => {
        let item = filterData[index].subList
        for (let i = 0; i < item.length; i++) {
            if (i == subIndex) {
                item[i].checked = !item[i].checked
            } else {
                item[i].checked = false
            }
        }
        props.dispatch({
            type: 'commodiy/setFilterData',
            payload: filterData
        })
    }

    // 点击重置按钮
    const reset = () => {
        for (let i = 0; i < filterData.length; i++) {
            let item = filterData[i].subList
            for (let j = 0; j < item.length; j++) {
                item[j].checked = false
            }
        }
        setPrice({ lowPrice: ''.replace(/[^0-9]/g, ''), highPrice: ''.replace(/[^0-9]/g, '') })
        props.dispatch({
            type: 'commodiy/setFilterData',
            payload: filterData
        })
        low.current.value = ''
        high.current.value = ''
    }

    // 点击确定按钮
    const ensure = () => {
        const myPriceRange = JSON.parse(sessionStorage.getItem('LOCAL_PRICE_RANGE'))
        if (myPriceRange.lowPrice - myPriceRange.highPrice > 0) {
            // this.toastData = {
            //     visible: true,
            //     message: '最低价不可大于最高价',
            //     position: 'middle-bottom'
            // }
            return
        }
        showTag[3].tag = false
        showTag[0].tag = true
        showTag[3].sort = false
        setSort(showTag)
        props.dispatch({
            type: 'commodiy/setShowTag',
            payload: showTag
        })
        props.dispatch({
            type: 'commodiy/setFilterData',
            payload: filterData
        })
        resetData()
    }

    const changeLowPrice = (e) => {
        let myPriceRange = JSON.parse(sessionStorage.getItem('LOCAL_PRICE_RANGE'))
        myPriceRange.lowPrice = e.target.value.replace(/[^0-9]/g, '')
        sessionStorage.setItem('LOCAL_PRICE_RANGE', JSON.stringify(myPriceRange))
    }

    const changeHighPrice = (e) => {
        let myPriceRange = JSON.parse(sessionStorage.getItem('LOCAL_PRICE_RANGE'))
        myPriceRange.highPrice = e.target.value.replace(/[^0-9]/g, '')
        sessionStorage.setItem('LOCAL_PRICE_RANGE', JSON.stringify(myPriceRange))
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
                                                <input
                                                    type='tel'
                                                    maxLength='10'
                                                    placeholder='最低价'
                                                    className='low'
                                                    ref={low}
                                                    onChange={changeLowPrice}
                                                />
                                                <span>————</span>
                                                <input
                                                    type='tel'
                                                    maxLength='10'
                                                    placeholder='最高价'
                                                    className='high'
                                                    ref={high}
                                                    onChange={changeHighPrice}
                                                />
                                            </div>
                                        </div>
                                    </li>
                                    {filterData
                                        ? filterData.map((filterItem, filterIndex) => {
                                              return (
                                                  <li className='list-item' key={filterIndex}>
                                                      {/*其他筛选条件*/}
                                                      {filterItem.subList && filterItem.subList.length > 0 ? (
                                                          <div className='brand filter-classify'>
                                                              <span className='filter-name'>{filterItem.Name}</span>
                                                              <div
                                                                  className={`more-btn-up ${
                                                                      filterItem.subList &&
                                                                      filterItem.subList.length <= 3
                                                                          ? 'hide'
                                                                          : ''
                                                                  }`}
                                                                  onClick={() => {
                                                                      showAll(filterIndex)
                                                                  }}>
                                                                  全部
                                                                  <span className='icon-up'>
                                                                      {!filterItem.tag ? (
                                                                          <img
                                                                              className='img'
                                                                              src={require('../../../../../../common/assets/down.png')}
                                                                              alt=''
                                                                          />
                                                                      ) : null}
                                                                      {filterItem.tag ? (
                                                                          <img
                                                                              className='img'
                                                                              src={require('../../../../../../common/assets/up.png')}
                                                                              alt=''
                                                                          />
                                                                      ) : null}
                                                                  </span>
                                                              </div>
                                                          </div>
                                                      ) : null}
                                                      <div className='sub-view' style={{ display: 'inline-block' }}>
                                                          {!filterItem.tag ? (
                                                              <ul>
                                                                  {filterItem.subList.map((subItem, index) => {
                                                                      return (
                                                                          <li
                                                                              key={index}
                                                                              className={`sub-item ${
                                                                                  index > 2 ? 'hide' : ''
                                                                              } ${subItem.checked ? 'checked' : ''}`}
                                                                              onClick={() => {
                                                                                  changeChecked(filterIndex, index)
                                                                              }}>
                                                                              <span>{subItem.subName}</span>
                                                                          </li>
                                                                      )
                                                                  })}
                                                              </ul>
                                                          ) : null}
                                                          {filterItem.tag ? (
                                                              <ul>
                                                                  {filterItem.subList.map((subItem, index) => {
                                                                      return (
                                                                          <li
                                                                              key={index}
                                                                              className={`sub-item ${
                                                                                  subItem.checked ? 'checked' : ''
                                                                              }`}
                                                                              onClick={() => {
                                                                                  changeChecked(filterIndex, index)
                                                                              }}>
                                                                              <span>{subItem.subName}</span>
                                                                          </li>
                                                                      )
                                                                  })}
                                                              </ul>
                                                          ) : null}
                                                      </div>
                                                  </li>
                                              )
                                          })
                                        : null}
                                </ul>
                            </div>
                        </div>
                        <div className='bottom-bar'>
                            <div className='reset' onClick={reset}>
                                {' '}
                                重置
                            </div>
                            <div className='ensure' onClick={ensure}>
                                {' '}
                                确定
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
            {/* <Toast v-if='toastData.visible'></Toast> */}
        </div>
    )
}

export default connect(mapStateToProps)(FilterCommondity)
