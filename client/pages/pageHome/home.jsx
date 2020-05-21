import React, { Component } from 'react'
import { connect } from 'dva'
/* components */
import CarInfo from './components/cafInfo/carInfo'
import Nav from './components/nav/nav'
import CarList from './components/carList/carList'
import SkuList from './components/skuList/skuList'
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
        topBanHeight: state.carInfo.topBanHeight
    }
}
class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            navFixed: false
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
        const { defaultCar, carListStatus, carList, allData } = this.props
        // 处理所有接口请求，除了carList以外
        const isFetch = this.props.loading.global && !this.props.loading.models.carList
        return (
            <div id='pagehome'>
                {isFetch ? (
                    <Loading />
                ) : (
                    <div className='new-scelfmaintain'>
                        <CarInfo carList={defaultCar} />
                        <Nav navFixed={this.state.navFixed} defaultCar={defaultCar} allData={allData} />
                        <SkuList allData={allData} />
                        {/* <div
                            className='wrap'
                            style={{ height: '2000px', backgroundColor: '#333', margin: '0 auto' }}></div> */}
                        {carListStatus ? <CarList carListStatus={carListStatus} carList={carList} /> : null}
                    </div>
                )}
            </div>
        )
    }
}

export default connect(mapStateToProps)(Home)
