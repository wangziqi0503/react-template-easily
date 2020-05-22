import React from 'react'

const ItemLable = (props) => {
    const { item, sku } = props
    return (
        <div className='maintain-item-goods-tag'>
            {sku.carBSku.mark === 1 && item.name === '小保养' ? (
                <div className='warp'>
                    {sku.id === 25 ? <span className='maintain-item-type'>原厂机油</span> : null}
                    {sku.id === 2 ? <span className='maintain-item-type'>原厂机油</span> : null}
                </div>
            ) : null}
            {sku.carBSku.recommendFlag && item.name === '小保养' ? (
                <div className='warp'>
                    {sku.id === 25 ? <span className='maintain-item-type'>推荐机油</span> : null}
                    {sku.id === 2 ? <span className='maintain-item-type'>推荐机滤</span> : null}
                </div>
            ) : null}
            {item.name !== '小保养' ? (
                <div className='warp'>
                    <span className='maintain-item-type'>{sku.name}</span>
                </div>
            ) : null}
            {sku.carBSku.freeInstall ? (
                <div className='warp' className={sku.carBSku.freeInstall ? 'blue' : ''}>
                    <span className='maintain-item-type'>免费安装</span>
                </div>
            ) : null}
        </div>
    )
}
export default ItemLable
