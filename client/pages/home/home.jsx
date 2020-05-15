import React, { Component } from 'react'
import { connect } from 'dva'
/* components */
import CarInfo from './components/carInfo'
import Loading from '../../components/Loading/Loading'

/** utils */
// import { getUserLocation } from '@/common/utils/loaction'
const common = window.common

const mapStateToProps = (state) => {
    return {
        carList: state.homeInfo.carList,
        defaultCar: state.homeInfo.defaultCar,
        loading: state.loading
    }
}

// 获取地址栏信息，判断是否需要跳转保养手册页面

class Home extends Component {
    constructor(props) {
        super(props)
    }

    goToManual() {
        console.log('?')
        const query = this.props.location.search
        console.log(query)
        if (query.indexOf('/manual') != -1) {
            console.log('保养手册')
        }
    }

    componentWillMount() {
        const { fetchNAParams } = window.common
        const urlParmas = (this.props.location.search = fetchNAParams(urlParmas).then((res) => {
            // 判断url是否携带车辆信息
            res = JSON.stringify(res) == '{}' ? null : res
            this.props.dispatch({
                type: 'homeInfo/getCarList',
                payload: res
            })
        }))
    }
    componentDidMount() {}

    render() {
        const { defaultCar } = this.props
        const isFetch = this.props.loading.effects[('homeInfo/getCarList', 'homeInfo/getAllData')]
        return (
            <div id='pagehome'>
                {isFetch ? (
                    <Loading />
                ) : (
                    <div className='new-scelfmaintain'>
                        <CarInfo carList={defaultCar} />
                    </div>
                )}
            </div>
        )
    }
}

export default connect(mapStateToProps, common)(Home)
