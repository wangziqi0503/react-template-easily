import React, { Component } from 'react'
import { connect } from 'dva'
/* components */
import CarInfo from './components/cafInfo/carInfo'
import Nav from './components/nav/nav'
import CarList from './components/carList/carList'
import Loading from '../../components/Loading/Loading'

/** utils */
import { fetchNAParams } from '@/common/utils/Common'
import './home.scss'

const mapStateToProps = (state) => {
    return {
        carList: state.homeInfo.carList,
        defaultCar: state.homeInfo.defaultCar,
        loading: state.loading,
        carListStatus: state.homeInfo.carListStatus,
        topBanHeight: state.carInfo.topBanHeight,
        navFixed: state.carInfo.navFixed
    }
}
class Home extends Component {
    constructor(props) {
        super(props)
        this.getInitData = this.getInitData.bind(this)
        this.handleScroll = this.handleScroll.bind(this)
        this.setFixed = this.setFixed.bind(this)
    }

    // 跳转保养手册
    goToManual() {
        const query = this.props.location.pathname
        if (query.indexOf('/manual') != -1) {
            this.props.history.push('/manual')
        }
    }

    getInitData() {
        const urlParmas = (this.props.location.search = fetchNAParams(urlParmas).then((res) => {
            // 判断url是否携带车辆信息
            res = JSON.stringify(res) == '{}' ? null : res
            this.props.dispatch({
                type: 'homeInfo/getAddress',
                url: res
            })
        }))
    }

    //设置导航是否为fixed
    setFixed(showHide) {
        this.props.dispatch({
            type: 'carInfo/getNavFixed',
            payload: showHide
        })
    }

    // 监听页面滚动距离
    handleScroll(event) {
        const scrollTop =
            (event.srcElement ? event.srcElement.documentElement.scrollTop : false) ||
            window.pageYOffset ||
            (event.srcElement ? event.srcElement.body.scrollTop : 0)
        if (scrollTop > this.props.topBanHeight) {
            this.setFixed(true)
        } else {
            this.setFixed(false)
        }
    }

    componentWillMount() {
        this.getInitData()
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    render() {
        const { defaultCar, carListStatus, carList } = this.props
        // 处理所有接口请求，除了carList以外
        const isFetch = this.props.loading.global && !this.props.loading.models.carList
        return (
            <div id='pagehome'>
                {isFetch ? (
                    <Loading />
                ) : (
                    <div className='new-scelfmaintain'>
                        <CarInfo carList={defaultCar} />
                        <Nav />
                        <div
                            className='wrap'
                            style={{ height: '2000px', backgroundColor: '#000', margin: '0 auto' }}></div>
                        {carListStatus ? <CarList carListStatus={carListStatus} carList={carList} /> : null}
                    </div>
                )}
            </div>
        )
    }
}

export default connect(mapStateToProps)(Home)
