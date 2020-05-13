/**
 * @file PageHome.jsx
 * @desc 首页
 * @author wangziqi
 * @data 2017/07/21
 */

/** lib * */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

/** component* */
import CarInfo from './components/carInfo/carInfo'
import Loading from '../../component/common/Loading/Loading'
/** resources* */
import './_pageHome.scss'

/** action * */
import PageHomeAction from '../../reducers/pageHomeRereducer/pageHomeAction.jsx'
class PageHome extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {}

    componentDidMount() {
        if (this.props.Loading) {
            Loading.show()
        }
        const urlParmas = this.props.location.search
        this.props.getCarList(urlParmas)
    }

    render() {
        const { currentCar } = this.props
        return (
            <div id='pagehome'>
                {this.props.Loading ? null : (
                    <div className='new-scelfmaintain'>
                        <CarInfo carList={currentCar} />
                    </div>
                )}
            </div>
        )
    }
}

PageHome.contextTypes = {
    router: PropTypes.object
}

const mapState = (state) => ({
    list: state.getIn(['pageHomeReducer', 'allData']),
    carList: state.getIn(['pageHomeReducer', 'carList']),
    defaultCar: state.getIn(['pageHomeReducer', 'defaultCar']),
    currentCar: state.getIn(['pageHomeReducer', 'urlParmas']),
    Loading: state.getIn(['pageHomeReducer', 'loading'])
})

const mapDispatch = (dispatch) => ({
    getCarList(urlParmas) {
        dispatch(PageHomeAction.getAllData())
        dispatch(PageHomeAction.getCarList(urlParmas))
    }
})

PageHome = withRouter(connect(mapState, mapDispatch)(PageHome))

export default PageHome
