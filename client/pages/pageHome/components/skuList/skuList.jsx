import React from 'react'
import SkuItem from '../skuItem/skuItem'
import './skuList.scss'

const SkuList = React.memo((props) => {
    const allData = props.allData
    return (
        <div className='new-selfhelpMain'>
            <div className='new-maintain-list'>
                {allData
                    ? allData.map((item, index) => {
                          return (
                              <div className='wrap' key={index} id={`list-${index}`}>
                                  <div className='wrap-title' style={{ display: index !== 0 ? 'block' : 'none' }}>
                                      {`${item.serviceCategoryName}(${item.havingCount}/${item.totalCount})`}
                                  </div>
                                  <SkuItem data={allData[index]} index={index} />
                              </div>
                          )
                      })
                    : null}
            </div>
        </div>
    )
})
export default SkuList
