import React from 'react'
import { useRef, useEffect, useState, useMemo } from 'react'
import { connect } from 'dva'
import { parseObjectToUrlString, getBasePath } from '@/common/utils/Common'
import BScroll from 'better-scroll'
import './nav.scss'

const mapStateToProps = (state) => {
    return {
        defaultCar: state.homeInfo.defaultCar,
        navFixed: state.carInfo.navFixed,
        allData: state.homeInfo.allData
    }
}

const bindScroll = (data, liWidth) => {
    console.log('ppp')
    const wrapper = document.querySelector('.tab-scroll-fixed')
    const cont = document.querySelector('.cont')
    const width = (data.length + 0.4) * liWidth.current.clientWidth
    if (cont && cont != null) {
        cont.style.width = width + 'px'
    }
    scroll = new BScroll(wrapper, {
        startX: 0,
        click: true,
        scrollX: true,
        scrollY: false,
        bounce: false,
        bounceTime: false,
        eventPassthrough: 'vertical'
    })
}

// const Nav = React.memo（(props) => {
//     console.log(props)
//     const res = useMemo(() => {
//         console.log('111')
//     }, [props.navFixed])
//     return <div>123</div>
// }）

const Nav = (props) => {
    console.log('渲染子组件')
    const { navFixed, defaultCar, allData } = props
    let [scroll, setScroll] = useState(null)
    const liWidth = useRef()
    useEffect(() => {
        console.log('navFixed==', navFixed)
        if (navFixed) {
            bindScroll(allData, liWidth)
        } else {
            scroll ? scroll.refresh() : null
        }
    }, [navFixed])

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
    return (
        <div>
            <div className='liWidth' ref={liWidth}></div>
            {!navFixed ? (
                <div className='new-tab-manual'>
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
            ) : (
                <div className='tab-scroll-fixed'>
                    <ul className='clearfix cont'>
                        {allData.map((item, index) => {
                            return (
                                <li
                                    key={
                                        index
                                    }>{`${item.serviceCategoryName}(${item.havingCount}/${item.totalCount})`}</li>
                            )
                        })}
                    </ul>
                    <div className='tab_more'>
                        <span className='arrow arrow-down'></span>
                        <span className='arrow arrow-up'></span>
                    </div>
                </div>
            )}
            <div className='tab-shadow' style={{ display: 'none' }}></div>
        </div>
    )
}

export default connect(mapStateToProps)(Nav)
