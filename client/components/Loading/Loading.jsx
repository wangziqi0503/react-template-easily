import './_loading.scss'
import React from 'react'
import PropTypes from 'prop-types'
import * as ReactDOM from 'react-dom'
import img from './img/loading.png'

function Loading(loadingStyle) {
    let content = ''
    if (loadingStyle === 'line') {
        content = <img src={img} className='frc_loading_img' />
    } else {
        content = (
            <div className='frc_loading'>
                <div className='frc_loading-dot' />
                <div className='frc_loading-dot' />
                <div className='frc_loading-dot' />
                <div className='frc_loading-dot' />
                <div className='frc_loading-dot' />
                <div className='frc_loading-dot' />
                <div className='frc_loading-dot' />
                <div className='frc_loading-dot' />
            </div>
        )
    }
    return <div className='frc_loading_container'>{content}</div>
}

Loading.propTypes = {
    className: PropTypes.string,
    loadingStyle: PropTypes.oneOf(['dot', 'line'])
}

Loading.defaultProps = {
    className: '',
    loadingStyle: 'dot'
}

Loading.stack = []

export default Loading
// show: (loadingStyle) => {
//     console.log('show')
//     if (Loading.stack.length === 0) {
//         const div = document.createElement('div')
//         div.setAttribute('id', 'loading')
//         document.body.appendChild(div)
//         const loading = ReactDOM.render(<Loading loadingStyle={loadingStyle} />, div)
//     }
//     Loading.stack.push('loading')
//     console.log('show1')
// },
// disappear: () => {
//     console.log('disappear')
//     Loading.stack.pop()
//     if (Loading.stack.length === 0) {
//         const loadingDiv = document.getElementById('loading')
//         // console.log('loadingDiv==', loadingDiv)
//         loadingDiv ? document.body.removeChild(loadingDiv) : null
//     }
// }
