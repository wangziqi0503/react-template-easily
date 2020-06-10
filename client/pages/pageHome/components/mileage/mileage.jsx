import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router'
import { List, InputItem } from 'antd-mobile'
import { createForm } from 'rc-form'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { isEmpty, isNotEmpty } from '../../../../common/utils/Common'
import Toast from '@/components/Toast/Toast'
import './mileage.scss'

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent)
let moneyKeyboardWrapProps
if (isIPhone) {
    moneyKeyboardWrapProps = {
        onTouchStart: (e) => e.preventDefault()
    }
}

const Mileage = (props) => {
    const isShow = useSelector((state) => state.mileage.isShow)
    const defaultCar = useSelector((state) => state.homeInfo.defaultCar)
    const mainData = useSelector((state) => state.homeInfo.mainData)
    const carData = defaultCar.size > 0 ? defaultCar.toJS() : null
    const { getFieldProps } = props.form
    let refContainer = useRef(null)

    const closeTimeLog = () => {
        props.dispatch({
            type: 'mileage/setMileageStatus',
            payload: false
        })
    }

    const submitMile = () => {
        const current = refContainer.current.props

        if (!current.value || current.value == 0) {
            Toast.toastInstance('请填写里程', 1500)
            return
        }

        let reqBody = {
            queryType: '11',
            id: carData.id,
            mileage: current.value
        }

        const data = {
            functionId: 'usercar',
            body: JSON.stringify(reqBody)
        }

        carData.mileage = current.value
        mainData.mileages = current.value

        props.dispatch({
            type: 'mileage/getMileage',
            payload: data,
            callback: () => {
                props.dispatch({
                    type: 'homeInfo/saveDefaultCar',
                    payload: carData
                })
                props.dispatch({
                    type: 'homeInfo/getAllData',
                    payload: mainData
                })
                routerRedux.push({
                    pathname: '/home'
                })
                props.dispatch({
                    type: 'mileage/setMileageStatus',
                    payload: false
                })
            }
        })

        // props.dispatch({
        //     type: 'mileage/getMileage',
        //     payload: data
        // })
    }

    return (
        <React.Fragment>
            {isShow ? (
                <div className='new-dialog-mile-time'>
                    <List className='content'>
                        <div className='mile'>
                            <div className='mile-value'>
                                <div className='van-cell-group van-hairline--top-bottom'>
                                    <InputItem
                                        {...getFieldProps('money2', {
                                            normalize: (v, prev) => {
                                                if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
                                                    if (v === '.') {
                                                        return '0.'
                                                    }
                                                    return prev
                                                }
                                                return v
                                            }
                                        })}
                                        className='van-cell van-field'
                                        type={'money'}
                                        placeholder='请输入'
                                        ref={(el) => (refContainer.current = el)}
                                        // onVirtualKeyboardConfirm={(v) => console.log('onVirtualKeyboardConfirm:', v)}
                                        clear={false}
                                        maxLength='6'
                                        moneyKeyboardAlign='left'
                                        moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                                        disabledKeys={['.']}
                                        extra='KM'></InputItem>
                                </div>
                            </div>
                        </div>
                        <div className='change-status'>
                            <div
                                report-eventid='MCarSteward_SelfService_Close'
                                className='cancel'
                                onClick={closeTimeLog}>
                                取消
                            </div>
                            <div
                                report-eventid='MCarSteward_SelfServiceModelInfo'
                                className='confirm'
                                onClick={submitMile}>
                                更新
                            </div>
                        </div>
                    </List>
                </div>
            ) : null}
        </React.Fragment>
    )
}

const MileageWrapper = createForm()(Mileage)

export default withRouter(connect()(MileageWrapper))
