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
                          <React.Fragment key={subIndex}>
                              <div className={`new-maintain-item ${item.checked === 1 ? 'header-current' : ''}`}>
                                  <ItemHeader item={item} index={index} subIndex={subIndex} />
                                  {item.showType === 1 || item.showType === 2 ? (
                                      <div className='maintain-item-content'>
                                          {item.relateService
                                              ? item.relateService.map((relateService, relateServiceIndex) => {
                                                    return (
                                                        <React.Fragment key={relateServiceIndex}>
                                                            {relateService ? (
                                                                <React.Fragment key={relateServiceIndex}>
                                                                    {relateService.maintenanceBSkus
                                                                        ? relateService.maintenanceBSkus.map(
                                                                              (sku, skuIndex) => {
                                                                                  return (
                                                                                      <div
                                                                                          className='maintain-item-goods'
                                                                                          key={skuIndex}>
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
                                                                                              <ItemLable
                                                                                                  item={item}
                                                                                                  sku={sku}
                                                                                              />
                                                                                              <ItemPrice
                                                                                                  item={item}
                                                                                                  sku={sku}
                                                                                              />
                                                                                              <ItemEdit
                                                                                                  item={item}
                                                                                                  sku={sku}
                                                                                              />
                                                                                          </div>
                                                                                      </div>
                                                                                  )
                                                                              }
                                                                          )
                                                                        : null}
                                                                </React.Fragment>
                                                            ) : null}
                                                        </React.Fragment>
                                                    )
                                                })
                                              : null}
                                      </div>
                                  ) : null}
                              </div>
                          </React.Fragment>
                      )
                  })
                : null}
        </React.Fragment>
    )
})

export default SkuItem
