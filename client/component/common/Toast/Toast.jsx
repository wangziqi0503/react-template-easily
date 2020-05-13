/**
 * @file Toast 通用Toast组件,模拟IOS Android的Toast框,用于进行一些通知,根据设置的时间自动关闭
 * Created by wangziqi on 16/6/17.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import './_toast.scss'

class Toast extends Component {
    constructor(props) {
        super(props)

        // 超时ID
        this.closeTimer = ''

        this.state = {
            // 显示/关闭时的动画效果类名
            statusClassName: 'frc_tost_fadein'
        }
    }

    componentDidMount() {
        const { duration } = this.props
        // 根据设置的时间,自动关闭
        if (duration) {
            this.closeTimer = setTimeout(() => {
                this.props.callbackFun()
                this.close()
            }, duration)
        }
    }

    componentDidUnMount() {
        this.clearCloseTimer()
    }

    close() {
        this.clearCloseTimer()
        this.setState({ statusClassName: 'frc_tost_fadeout' })
        this.props.closeHandler()
    }

    clearCloseTimer() {
        if (this.closeTimer) {
            clearTimeout(this.closeTimer)
            this.closeTimer = null
        }
    }

    render() {
        const { className, text } = this.props

        return (
            <div className='frc_toast_container'>
                <div className={`${className} ${this.state.statusClassName} frc_tost`}>{text}</div>
            </div>
        )
    }
}

export default {
    toastInstance(text, duration, className, callbackFun) {
        const toastDom = document.getElementsByClassName('frc_toast_container')[0]
        if (toastDom) return

        const divEl = document.createElement('div')
        divEl.setAttribute('for', 'toast')
        document.body.appendChild(divEl)

        const closeHandler = () => {
            // 500毫秒后执行,因为关闭动画
            setTimeout(() => {
                ReactDOM.unmountComponentAtNode(divEl)
                document.body.removeChild(divEl)
            }, 500)
        }

        const props = {
            className,
            duration,
            text,
            closeHandler,
            callbackFun
        }

        ReactDOM.render(<Toast {...props} />, divEl)
    }
}
