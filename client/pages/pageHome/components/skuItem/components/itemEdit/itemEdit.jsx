import React from 'react'

const ItemEdit = (props) => {
    const { item, sku } = props
    return (
        <React.Fragment>
            {item.showType === 1 ? (
                <div className='maintain-item-goods-change-btn'>
                    <span className='change-text'>更换</span>
                </div>
            ) : null}

            {item.showType === 2 ? (
                <div className='maintain-item-goods-change-btn'>
                    <span className='change-text'>删除</span>
                </div>
            ) : null}
            {sku.mask ? (
                <div className='mask-delete'>
                    <div className='mask-text'>确定要删除这个商品么</div>
                    <div className='mask-status'>
                        <div className='cancel'>取消</div>
                        <div className='confirm'>删除</div>
                    </div>
                </div>
            ) : null}
        </React.Fragment>
    )
}

export default ItemEdit
