import React from 'react'
const Test = (props) => {
    console.log(props)
    const allData = props.allData.size > 0 ? props.allData.toJS() : null
    console.log(allData)
    return (
        <div>
            {allData
                ? allData.map((item, index) => {
                      return <div key={index}>{item.serviceCategoryName}</div>
                  })
                : null}
        </div>
    )
}

export default Test
