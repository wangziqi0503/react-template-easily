import React from 'react'
import ItemHeader from './components/itemHeader/itemHeader'
import ItemLable from './components/itemLable/itemLable'
import ItemPrice from './components/itemPriece/itemPrice'
import ItemEdit from './components/ItemEdit/ItemEdit'
import './skuItem.scss'

const SkuItem = React.memo((props) => {
    const maintenanceItemInstances = props.data.maintenanceItemInstances
    const index = props.index

    return (
        <React.Fragment>
            {maintenanceItemInstances
                ? maintenanceItemInstances.map((item, subIndex) => {
                      return (
                          <div
                              className={`new-maintain-item ${item.checked === 1 ? 'header-current' : ''}`}
                              key={subIndex}>
                              <ItemHeader item={item} index={index} subIndex={subIndex} />
                              {item.checked === 1 ? (
                                  <div className='maintain-item-content'>
                                      {item.relateService
                                          ? item.relateService.map((relateService, relateServiceIndex) => {
                                                return (
                                                    <React.Fragment key={relateServiceIndex}>
                                                        {relateService.maintenanceBSkus ? (
                                                            relateService.maintenanceBSkus.map((sku, skuIndex) => {
                                                                return (
                                                                    <React.Fragment key={skuIndex}>
                                                                        {sku.skuNumber > 0 ? (
                                                                            <div className='maintain-item-goods'>
                                                                                <div className='maintain-item-goods-img'>
                                                                                    <img
                                                                                        src={`//m.360buyimg.com/tcar/s240x240_${sku.carBSku.mainImage}!q60`}
                                                                                        style={{
                                                                                            display: 'inline'
                                                                                        }}
                                                                                    />
                                                                                </div>

                                                                                <div className='maintain-item-goods-detail'>
                                                                                    <div className='maintain-item-goods-detail-title'>
                                                                                        <span className='goods-title'>
                                                                                            {sku.carBSku.name}
                                                                                        </span>
                                                                                    </div>
                                                                                    <ItemLable item={item} sku={sku} />
                                                                                    <ItemPrice
                                                                                        item={item}
                                                                                        sku={sku}
                                                                                        index={index}
                                                                                        subIndex={subIndex}
                                                                                        relateServiceIndex={
                                                                                            relateServiceIndex
                                                                                        }
                                                                                        skuIndex={skuIndex}
                                                                                    />
                                                                                    <ItemEdit
                                                                                        item={item}
                                                                                        sku={sku}
                                                                                        index={index}
                                                                                        subIndex={subIndex}
                                                                                        relateServiceIndex={
                                                                                            relateServiceIndex
                                                                                        }
                                                                                        skuIndex={skuIndex}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        ) : null}
                                                                    </React.Fragment>
                                                                )
                                                            })
                                                        ) : (
                                                            <div className='maintain-item-goods no-sku'>暂无商品</div>
                                                        )}
                                                    </React.Fragment>
                                                )
                                            })
                                          : null}
                                  </div>
                              ) : null}
                          </div>
                      )
                  })
                : null}
        </React.Fragment>
    )
})

export default SkuItem
