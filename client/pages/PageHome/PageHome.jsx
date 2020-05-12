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
import MarqueeText from '../../component/common/MarqueeText/MarqueeText'
import CarInfo from './components/carInfo/carInfo'
/** resources* */
import './_pageHome.scss'

/** action * */
import PageHomeAction from '../../reducers/pageHomeRereducer/pageHomeAction.jsx'
class PageHome extends Component {
    static propTypes = {}

    static defaultProps = {}

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getCarList()
    }

    render() {
        const { list, carList } = this.props
        const listArr = list.classifiedMainItems
        return (
            <div id='pagehome'>
                <div className='new-scelfmaintain'>
                    <CarInfo />
                </div>
            </div>
        )
    }
}

PageHome.contextTypes = {
    router: PropTypes.object
}

const mapState = (state) => ({
    list: state.getIn(['pageHomeReducer', 'allData']),
    carList: state.getIn(['pageHomeReducer', 'carList'])
})

const mapDispatch = (dispatch) => ({
    getCarList() {
        dispatch(PageHomeAction.getAllData())
        dispatch(PageHomeAction.getCarList())
    }
})

PageHome = withRouter(connect(mapState, mapDispatch)(PageHome))

export default PageHome
