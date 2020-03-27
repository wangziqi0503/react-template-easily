/**
 * @file PageHome.jsx
 * @desc 首页
 * @author yangchao
 * @data 2017/07/21
 */

/** lib **/
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

/**component**/
import MarqueeText from '../../component/common/MarqueeText/MarqueeText.jsx';

/**resources**/
import './_pageHome.scss';

/** action **/
import PageHomeAction from '../../actions/pageHomeAction.jsx';
import CommonAction from '../../actions/commonAction.jsx';

/** other **/
import statisticConst from '../../common/constant/StatisticConstant.jsx';
import Service from '../../service/Service.jsx';
import Const from '../../common/constant/Constant.jsx';

class PageHome extends Component {
    constructor(props) {
        super(props);
    };

    static propTypes = {};

    static defaultProps = {};

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    componentDidMount() {

    }

    componentDidUpdate() {
    }

    componentWillUpdate() {
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        return (
            <div id='pagehome'>
                jinjiaxing's react cli
                <MarqueeText marqueeData={['aaa','bbb','ccc']}/>
            </div>
        );
    }
}

PageHome.contextTypes = {
    router: PropTypes.object
};

const mapStateToProps = (state) => {
    return {}
};

PageHome = withRouter(connect(mapStateToProps)(PageHome));

export default PageHome;
