import React, { Component } from 'react'
import { connect } from 'dva'
/* components */
import CarInfo from './components/cafInfo/carInfo'
import Loading from '../../components/Loading/Loading'

/** utils */

import CarList from './components/carList/carList'

const mapStateToProps = (state) => {
    return {
        carList: state.homeInfo.carList,
        defaultCar: state.homeInfo.defaultCar,
        loading: state.loading,
        carListStatus: state.homeInfo.carListStatus
    }
}

// 获取地址栏信息，判断是否需要跳转保养手册页面

class Home extends Component {
    constructor(props) {
        super(props)
        this.getInitData = this.getInitData.bind(this)
    }

    // 跳转保养手册
    goToManual() {
        const query = this.props.location.pathname
        if (query.indexOf('/manual') != -1) {
            this.props.history.push('/manual')
        }
    }

    getInitData() {
        const { fetchNAParams } = window.common
        const urlParmas = (this.props.location.search = fetchNAParams(urlParmas).then((res) => {
            // 判断url是否携带车辆信息
            res = JSON.stringify(res) == '{}' ? null : res
            this.props.dispatch({
                type: 'homeInfo/getAddress',
                url: res
            })
        }))
    }

    componentWillMount() {
        this.getInitData()
    }

    componentDidMount() {}

    render() {
        const { defaultCar, carListStatus } = this.props
        const isFetch = this.props.loading.global
        return (
            <div id='pagehome'>
                {isFetch ? (
                    <Loading />
                ) : (
                    <div className='new-scelfmaintain'>
                        <CarInfo carList={defaultCar} />
                        {carListStatus ? <CarList /> : null}
                    </div>
                )}
            </div>
        )
    }
}

export default connect(mapStateToProps)(Home)
