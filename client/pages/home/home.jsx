import React, { Component } from 'react'
import { connect } from 'dva'
/* components */
import CarInfo from './components/carInfo'

const mapStateToProps = (state) => {
    console.log('WarehouseInfo>', state.homeInfo.carList)
    return {
        carList: state.homeInfo.carList,
        defaultCar: state.homeInfo.defaultCar,
        loading: state.loading
    }
}
class Home extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        console.log(this.props.loading)
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
    componentDidMount() {
        // this.props.dispatch({
        //     type: 'homeInfo/getCarList',
        //     payload: {}
        // })
    }

    render() {
        const { defaultCar } = this.props
        return (
            <div id='pagehome'>
                <div className='new-scelfmaintain'>
                    <CarInfo carList={defaultCar} />
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Home)
