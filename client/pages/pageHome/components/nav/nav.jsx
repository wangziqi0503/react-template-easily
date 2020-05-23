import React from 'react'
import { useRef, useEffect, useState } from 'react'
import { parseObjectToUrlString, getBasePath } from '@/common/utils/Common'
import BScroll from 'better-scroll'
import './nav.scss'

let scroll

const bindScroll = (wrapper) => {
    if (!scroll) {
        scroll = new BScroll(wrapper, {
            startX: 0,
            click: true,
            scrollX: true,
            scrollY: false,
            bounce: false,
            bounceTime: false,
            momentum: false,
            eventPassthrough: 'vertical'
        })
    }
}

const handleTouchMove = (event) => {
    event.preventDefault()
}

const Nav = React.memo((props) => {
    const { defaultCar, allData, navFixed } = props
    const allDataJs = allData.size > 0 ? allData.toJS() : null
    const liWidth = useRef()
    let [moreTab, setMoreTab] = useState(false)

    const jumpTo = (index) => {
        if (moreTab) {
            let leftMove = liWidth.current.clientWidth * index * 0.5
            setTimeout(() => {
                scroll.scrollTo(-leftMove, 0, 800)
            }, 70)

            setMoreTab(false)
        } else {
            return false
        }
    }

    useEffect(() => {
        if (navFixed) {
            const wrapper = document.querySelector('.tab-scroll-fixed')
            bindScroll(wrapper)
        } else {
            scroll ? scroll.refresh() : null
        }
    }, [navFixed])

    useEffect(() => {
        const cont = document.querySelector('.cont')
        const scrollWidth = (allDataJs ? allDataJs.length + 0.1 : 0) * liWidth.current.clientWidth + 'px'
        let width = '100%'
        // setTimeout 防止触发两次showTab事件
        setTimeout(() => {
            if (moreTab) {
                width = width
                scroll ? scroll.disable() : null
                scroll ? scroll.scrollTo(0, 0, 0) : null
            } else {
                width = scrollWidth
                scroll ? scroll.enable() : null
            }
            if (cont && cont != null) {
                cont.style.width = width
            }
        })
    }, [moreTab])

    useEffect(() => {
        document.getElementById('tabFixed').addEventListener('mousewheel', handleTouchMove, { passive: false })
    }, [])

    const changTab = (e, num) => {
        const { id, brandName, seriesName, modelId, mileage, oilFillingQuantity, cylinders } = props.defaultCar
        let url = ''
        const str = parseObjectToUrlString({
            id,
            brandName,
            seriesName,
            modelId,
            mileage,
            oilFillingQuantity,
            cylinders
        })
        switch (num) {
            case 1:
                url = `${getBasePath('cargw')}/newSelfCareInit.html#/manual?${str}`
                break
            case 2:
                url = `${getBasePath('cargw')}/originalParameter.html#/?modelId=${defaultCar.modelId}`
                break
            case 3:
                url = `${getBasePath('cargw')}/maintainRecord.html#/?Id=${defaultCar.id}`
                break
            case 4:
                url = `${getBasePath('cargw')}/maintainComment.html#/?modelId=${defaultCar.modelId}`
                break
        }
        window.location.href = url
    }

    const showTab = () => {
        moreTab ? setMoreTab(false) : setMoreTab(true)
    }

    return (
        <div>
            <div className='liWidth' ref={liWidth}></div>

            <div className='new-tab-manual' style={{ display: !navFixed ? 'flex' : 'none' }}>
                <div className='J_ping' id='manual' onClick={(e) => changTab(e, 1)}>
                    <span>保养手册</span>
                </div>
                <div className='J_ping selfmain' onClick={(e) => changTab(e, 2)}>
                    <span>原厂参数</span>
                </div>
                <div className='J_ping selfmain' onClick={(e) => changTab(e, 3)}>
                    <span>保养记录</span>
                </div>
                <div className='J_ping selfmain' onClick={(e) => changTab(e, 4)}>
                    <span>保养晒单</span>
                </div>
            </div>

            <div className='tab-scroll-fixed' style={{ display: navFixed ? 'block' : 'none' }}>
                <ul className='clearfix cont'>
                    {allDataJs
                        ? allDataJs.map((item, index) => {
                              return (
                                  <li
                                      key={index}
                                      onClick={() => {
                                          jumpTo(index)
                                      }}>{`${item.serviceCategoryName}(${item.havingCount}/${item.totalCount})`}</li>
                              )
                          })
                        : null}
                </ul>
                <div className='tab_more' onClick={showTab}>
                    {!moreTab ? <span className='arrow arrow-down'></span> : <span className='arrow arrow-up'></span>}
                </div>
            </div>
            <div className='tab-shadow' id='tabFixed' style={{ display: moreTab ? 'block' : 'none' }}></div>
        </div>
    )
})

export default Nav
