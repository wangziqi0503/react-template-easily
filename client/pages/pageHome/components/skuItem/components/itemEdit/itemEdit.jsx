import React, { useEffect, useState } from 'react'
import { connect } from 'dva'
const mapStateToProps = (state) => {
    return {
        allData: state.homeInfo.allData
    }
}

// 校验当前保养项目下全部sku数量都为0方法
const checkAdult = (item) => {
    return item.skuNumber === 0
}

const ItemEdit = (props) => {
    const { item, sku, index, subIndex, relateServiceIndex, skuIndex } = props
    const [num, setNum] = useState(-1)
    const [mask, setMask] = useState(false)
    const allData = props.allData.toJS()

    // 删除当前sku，数量置为0
    const deleteItem = () => {
        setMask(true)
        ModalHelper.afterOpen()
    }

    const cancelDelete = () => {
        setMask(false)
        ModalHelper.beforeClose()
    }

    const confirmDelete = () => {
        setNum(0)
        setMask(false)
        ModalHelper.beforeClose()
    }

    useEffect(() => {
        if (num !== -1) {
            allData[index].maintenanceItemInstances[subIndex].relateService[relateServiceIndex].maintenanceBSkus[
                skuIndex
            ].skuNumber = num

            props.dispatch({
                type: 'homeInfo/resetAllData',
                payload: allData,
                callback: () => {
                    const arr =
                        allData[index].maintenanceItemInstances[subIndex].relateService[relateServiceIndex]
                            .maintenanceBSkus
                    // 商品数量全为0，关闭当前栏目
                    if (arr.every(checkAdult)) {
                        allData[index].maintenanceItemInstances[subIndex].checked = 0
                        props.dispatch({
                            type: 'homeInfo/resetAllData',
                            payload: allData
                        })
                    }
                }
            })
            // console.log(item)
        }
    }, [num])
    return (
        <React.Fragment>
            {item.showType === 1 ? (
                <div className='maintain-item-goods-change-btn'>
                    <span className='change-text'>更换</span>
                </div>
            ) : null}

            {item.showType === 2 ? (
                <div className='maintain-item-goods-change-btn'>
                    <span className='change-text' onClick={deleteItem}>
                        删除
                    </span>
                </div>
            ) : null}
            {mask ? (
                <React.Fragment>
                    <div className='maintainItem-mask'></div>
                    <div className='mask-delete'>
                        <div className='mask-text'>确定要删除这个商品么</div>
                        <div className='mask-status'>
                            <div className='cancel' onClick={cancelDelete}>
                                取消
                            </div>
                            <div className='confirm' onClick={confirmDelete}>
                                删除
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            ) : null}
        </React.Fragment>
    )
}

export default connect(mapStateToProps)(ItemEdit)
