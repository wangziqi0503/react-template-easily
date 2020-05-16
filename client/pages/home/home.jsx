import React, { Component } from 'react'
import { connect } from 'dva'
/* components */
import CarInfo from './components/carInfo'
import Loading from '../../components/Loading/Loading'

/** utils */
import { getUserLocation } from '@/common/utils/loaction'
import { getAddress } from '@/api/home.js'

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
        this.getLoctaionInfo = this.getLoctaionInfo.bind(this)
        this.getParmasSku = this.getParmasSku.bind(this)
        // this.getSkuParmas = this.getSkuParmas(this)
    }

    // 跳转保养手册
    goToManual() {
        const query = this.props.location.pathname
        console.log(query)
        if (query.indexOf('/manual') != -1) {
            this.props.history.push('/manual')
        }
    }

    // 获取用户坐标
    getLoctaionInfo(common) {
        getUserLocation()
            .then((result) => {
                common.setCookie('longitude', result.lng)
                common.setCookie('latitude', result.lat)
            })
            .catch((err) => {
                console.log(common)
                common.setCookie('latitude', 39.907687) // 设置用户纬度
                common.setCookie('longitude', 116.397625) // 设置用户经度
            })
    }
    // 配置获取sku全部商品数据参数
    getParmasSku() {
        const { fetchNAParams, setCookie, getCookie } = window.common
        // const { defaultCar } = this.props
        // 设置用户地址信息
        getAddress()
            .then((response) => {
                if (response.code == 0 && response.data != null && response.data.defaultAddress) {
                    let item
                    if (response.data.defaultAddress instanceof Array && response.data.defaultAddress.length > 0) {
                        item = response.data.defaultAddress[0]
                    } else {
                        item = response.data.defaultAddress
                    }
                    setCookie('person_area1', item.provinceId, 10000, '/')
                    setCookie('person_area2', item.cityId, 10000, '/')
                    setCookie('person_area3', item.countyId, 10000, '/')
                    setCookie('person_area4', item.townId, 10000, '/')
                    let myPara = item.provinceId + '_' + item.cityId + '_' + item.countyId + '_' + item.townId
                    setCookie('person_area', myPara, 10000, '/')
                    // setCookie('person_provinceName', item.provinceName  + '市')
                    setCookie('person_provinceName', item.provinceId > 4 ? item.cityName : item.provinceName + '市')
                    // console.log(common.getCookie('person_provinceName'))
                } else {
                    setCookie('person_area1', '1', 10000, '/')
                    setCookie('person_area2', '72', 10000, '/')
                    setCookie('person_area3', '2799', 10000, '/')
                    setCookie('person_area4', '0', 10000, '/')
                    setCookie('person_area', '1_72_2799_0', '/')
                    setCookie('person_provinceName', '北京市')
                }
            })
            .then(() => {
                console.log('??')
                // 设置用户坐标信息
                this.getLoctaionInfo(window.common)
            })
            .then(() => {
                let provinceCode = getCookie('person_area1') ? getCookie('person_area1') : '1'
                let cityCode = getCookie('person_area2') ? getCookie('person_area2') : '2810'
                let areaCode = getCookie('person_area3') ? getCookie('person_area3') : '51081'
                let lng = getCookie('longitude') ? getCookie('longitude') : '39.72684'
                let lat = getCookie('latitude') ? getCookie('latitude') : '116.34159'
                let selsctItemIds = JSON.parse(sessionStorage.getItem('SELECT_ITEMIDS'))
                const mainData = {
                    // carUserModelId: defaultCar.id,
                    // modelId: defaultCar.modelId,
                    typeIds: selsctItemIds || '',
                    // mileages: defaultCar.mileage || '',
                    lng: lng ? lng : '',
                    lat: lat ? lat : '',
                    provinceCode: provinceCode,
                    cityCode: cityCode,
                    areaCode: areaCode
                }

                const urlParmas = (this.props.location.search = fetchNAParams(urlParmas).then((res) => {
                    // 判断url是否携带车辆信息
                    res = JSON.stringify(res) == '{}' ? null : res
                    console.log(res)
                    this.props.dispatch({
                        type: 'homeInfo/getCarList',
                        payload: { res, mainData }
                    })
                }))
            })
    }

    componentWillMount() {
        this.getParmasSku()
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

export default connect(mapStateToProps)(Home)
