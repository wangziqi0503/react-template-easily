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

/** resources* */
import './_pageHome.scss'

/** action * */
import PageHomeAction from '../../actions/pageHomeAction.jsx'
import CommonAction from '../../actions/commonAction.jsx'

/** other * */
import statisticConst from '../../common/constant/StatisticConstant.jsx'
import Service from '../../service/Service.jsx'
import Const from '../../common/constant/Constant.jsx'

class PageHome extends Component {
    static propTypes = {}

    static defaultProps = {}

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.props.getHomeData()
    }

    componentWillUnmount() {}

    componentDidMount() {}

    componentDidUpdate() {}

    componentWillUpdate() {}

    componentWillReceiveProps(nextProps) {}

    render() {
        return (
            <div id='pagehome'>
                {this.props.}
                <MarqueeText marqueeData={['aaa1', 'bbb', 'ccc']} />
            </div>
        )
    }
}

PageHome.contextTypes = {
    router: PropTypes.object
}

const mapStateToProps = (state) => ({})

const mapDispatch = (dispatch) => ({
    getHomeData() {
        dispatch(PageHomeAction.getAlltData())
    }
})

PageHome = withRouter(connect(mapStateToProps, mapDispatch)(PageHome))

export default PageHome
