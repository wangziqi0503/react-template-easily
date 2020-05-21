import React from 'react'
import ItemHeader from './components/itemHeader/itemHeader'
import './skuItem.scss'

const SkuItem = React.memo((props) => {
    const maintenanceItemInstances = props.data.maintenanceItemInstances
    return (
        <React.Fragment>
            {maintenanceItemInstances
                ? maintenanceItemInstances.map((item, subIndex) => {
                      return (
                          <React.Fragment key={subIndex}>
                              <div className={`new-maintain-item ${item.checked === 1 ? 'header-current' : ''}`}>
                                  <ItemHeader data={item} />
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
                                                                                              <div className='maintain-item-goods-tag'>
                                                                                                  {sku.carBSku.mark ===
                                                                                                      1 &&
                                                                                                  item.name ===
                                                                                                      '小保养' ? (
                                                                                                      <div className='warp'>
                                                                                                          {sku.id ===
                                                                                                          25 ? (
                                                                                                              <span
                                                                                                                  className='maintain-item-type'
                                                                                                                  v-show='goods.id==25'>
                                                                                                                  原厂机油
                                                                                                              </span>
                                                                                                          ) : null}
                                                                                                          {sku.id ===
                                                                                                          2 ? (
                                                                                                              <span
                                                                                                                  className='maintain-item-type'
                                                                                                                  v-show='goods.id==25'>
                                                                                                                  原厂机油
                                                                                                              </span>
                                                                                                          ) : null}
                                                                                                      </div>
                                                                                                  ) : null}
                                                                                                  {sku.carBSku
                                                                                                      .recommendFlag &&
                                                                                                  item.name ==
                                                                                                      '小保养' ? (
                                                                                                      <div className='warp'>
                                                                                                          {sku.id ===
                                                                                                          25 ? (
                                                                                                              <span
                                                                                                                  className='maintain-item-type'
                                                                                                                  v-show='goods.id==25'>
                                                                                                                  推荐机油
                                                                                                              </span>
                                                                                                          ) : null}
                                                                                                          {sku.id ===
                                                                                                          2 ? (
                                                                                                              <span
                                                                                                                  className='maintain-item-type'
                                                                                                                  v-show='goods.id==25'>
                                                                                                                  推荐机滤
                                                                                                              </span>
                                                                                                          ) : null}
                                                                                                      </div>
                                                                                                  ) : null}
                                                                                                  {item.name !==
                                                                                                  '小保养' ? (
                                                                                                      <div className='warp'>
                                                                                                          <span className='maintain-item-type'>
                                                                                                              {sku.name}
                                                                                                          </span>
                                                                                                      </div>
                                                                                                  ) : null}
                                                                                                  {sku.carBSku
                                                                                                      .freeInstall ? (
                                                                                                      <div
                                                                                                          className='warp'
                                                                                                          className={
                                                                                                              sku
                                                                                                                  .carBSku
                                                                                                                  .freeInstall
                                                                                                                  ? 'blue'
                                                                                                                  : ''
                                                                                                          }>
                                                                                                          <span className='maintain-item-type'>
                                                                                                              免费安装
                                                                                                          </span>
                                                                                                      </div>
                                                                                                  ) : null}
                                                                                              </div>
                                                                                              <div className='maintain-item-goods-number-show'>
                                                                                                  {sku.carBSku
                                                                                                      .mJdPrice ==
                                                                                                      '暂无报价' ||
                                                                                                  sku.carBSku
                                                                                                      .mJdPrice ==
                                                                                                      null ? (
                                                                                                      <span className='maintain-item-goods-price-flag hide'>
                                                                                                          ¥
                                                                                                      </span>
                                                                                                  ) : (
                                                                                                      <span className='maintain-item-goods-price-flag'>
                                                                                                          ¥
                                                                                                      </span>
                                                                                                  )}
                                                                                                  {sku.carBSku
                                                                                                      .mJdPrice ==
                                                                                                      '暂无报价' ||
                                                                                                  sku.carBSku
                                                                                                      .mJdPrice ==
                                                                                                      null ? (
                                                                                                      <span className='maintain-item-goods-price'>
                                                                                                          暂无报价
                                                                                                      </span>
                                                                                                  ) : (
                                                                                                      <span className='maintain-item-goods-price'>
                                                                                                          {
                                                                                                              sku
                                                                                                                  .carBSku
                                                                                                                  .mJdPrice
                                                                                                          }
                                                                                                      </span>
                                                                                                  )}
                                                                                                  {item.showType ==
                                                                                                  1 ? (
                                                                                                      <div className='maintain-item-goods-num-flag'>
                                                                                                          X
                                                                                                          <span className='maintain-item-goods-num'>
                                                                                                              {
                                                                                                                  sku.skuNumber
                                                                                                              }
                                                                                                          </span>
                                                                                                      </div>
                                                                                                  ) : null}
                                                                                                  {item.showType ===
                                                                                                  2 ? (
                                                                                                      <div className='maintain-item-goods-change'>
                                                                                                          <div className='maintain-item-goods-number-change'>
                                                                                                              <div
                                                                                                                  className='number-change add-number J_ping'
                                                                                                                  report-eventid='MCarSteward_SelfService_Add'>
                                                                                                                  +
                                                                                                              </div>
                                                                                                              <span className='number-show'>
                                                                                                                  {
                                                                                                                      goods.skuNumber
                                                                                                                  }
                                                                                                              </span>
                                                                                                              {sku.skuNumber <=
                                                                                                              1 ? (
                                                                                                                  <div className='number-change sub-number gray'>
                                                                                                                      -
                                                                                                                  </div>
                                                                                                              ) : (
                                                                                                                  <div className='number-change sub-number J_ping'>
                                                                                                                      -
                                                                                                                  </div>
                                                                                                              )}
                                                                                                          </div>
                                                                                                      </div>
                                                                                                  ) : null}
                                                                                              </div>
                                                                                              {sku.carBSku
                                                                                                  .complimentarySkuNames !=
                                                                                                  null &&
                                                                                              sku.carBSku
                                                                                                  .complimentarySkuNames !=
                                                                                                  '' ? (
                                                                                                  <div className='maintain-item-goods-gift'>
                                                                                                      <span className='gift-icon'>
                                                                                                          赠
                                                                                                      </span>
                                                                                                      {
                                                                                                          sku.carBSku
                                                                                                              .complimentarySkuNames
                                                                                                      }
                                                                                                  </div>
                                                                                              ) : null}
                                                                                          </div>

                                                                                          {item.showType == 1 ? (
                                                                                              <div className='maintain-item-goods-change-btn'>
                                                                                                  <span className='change-text'>
                                                                                                      更换
                                                                                                  </span>
                                                                                              </div>
                                                                                          ) : null}

                                                                                          {item.showType === 2 ? (
                                                                                              <div className='maintain-item-goods-change-btn'>
                                                                                                  <span class='change-text'>
                                                                                                      删除
                                                                                                  </span>
                                                                                              </div>
                                                                                          ) : null}
                                                                                          {sku.mask ? (
                                                                                              <div className='mask-delete'>
                                                                                                  <div className='mask-text'>
                                                                                                      确定要删除这个商品么
                                                                                                  </div>
                                                                                                  <div className='mask-status'>
                                                                                                      <div class='cancel'>
                                                                                                          取消
                                                                                                      </div>
                                                                                                      <div className='confirm'>
                                                                                                          删除
                                                                                                      </div>
                                                                                                  </div>
                                                                                              </div>
                                                                                          ) : null}
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
