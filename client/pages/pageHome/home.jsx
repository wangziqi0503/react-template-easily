import React, { Component } from 'react'
import { connect } from 'dva'
/* components */
import CarInfo from './components/cafInfo/carInfo'
import Nav from './components/nav/nav'
import CarList from './components/carList/carList'
import SkuList from './components/skuList/skuList'
import CommodityMarket from './components/commodityMarket/index'
import Mileage from './components/mileage/mileage'
import Introduce from './components/introduce/introduce'
import Settlement from './components/settlement/settlement'
import Loading from '../../components/Loading/Loading'

/** utils */
import { fetchNAParams } from '@/common/utils/Common'
import './home.scss'

const mapStateToProps = (state) => {
    return {
        carList: state.homeInfo.carList,
        defaultCar: state.homeInfo.defaultCar,
        carListStatus: state.homeInfo.carListStatus,
        allData: state.homeInfo.allData,
        loading: state.loading,
        topBanHeight: state.carInfo.topBanHeight,
        commodiyStatus: state.commodiy.commodiyStatus
    }
}
class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            navFixed: false,
            commodiyFlag: false
        }
        this.getInitData = this.getInitData.bind(this)
        this.handleScroll = this.handleScroll.bind(this)
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

    // 监听页面滚动距离
    handleScroll(event) {
        const scrollTop =
            (event.srcElement ? event.srcElement.documentElement.scrollTop : false) ||
            window.pageYOffset ||
            (event.srcElement ? event.srcElement.body.scrollTop : 0)
        if (scrollTop >= this.props.topBanHeight) {
            // setTimeout 同步执行setState, 防止导航抖动
            setTimeout(() => {
                this.setState({
                    navFixed: true
                })
            })
        } else {
            setTimeout(() => {
                this.setState({
                    navFixed: false
                })
            })
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
        const { defaultCar, carListStatus, commodiyStatus, carList, allData } = this.props
        const isFetch = this.props.loading.models['homeInfo'] && !this.props.loading.effects['homeInfo/getDiscount']
        return (
            <div id='pagehome'>
                {isFetch ? (
                    <Loading />
                ) : (
                    <div className='new-scelfmaintain'>
                        {/* <Test allData={allData} /> */}
                        <Mileage />
                        <Introduce />
                        <CarInfo carList={defaultCar} />
                        <Nav navFixed={this.state.navFixed} defaultCar={defaultCar} allData={allData} />
                        <SkuList allData={allData} />
                        {carListStatus ? <CarList carListStatus={carListStatus} carList={carList} /> : null}
                        {commodiyStatus ? <CommodityMarket /> : null}
                        <Settlement />
                    </div>
                )}
            </div>
        )
    }
}

export default connect(mapStateToProps)(Home)
