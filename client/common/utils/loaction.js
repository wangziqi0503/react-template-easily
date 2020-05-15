const maps = window.qq.maps

// 随机获取腾讯地图KEY
function getRandomKey() {
    // 企业注册号
    return {
        app: 'car-shoplist',
        key: 'TUKBZ-5PRWF-MDNJ2-JLFXE-I6C72-JLBEX'
    }
}

/**
 * @description 获取用户位置，先GPS后IP
 * @returns
 */
export const getUserLocation = () => {
    return getGPSLocation()
        .then((position) => {
            // console.log('获取精确地理位置成功:', position)
            return Promise.resolve(position)
        })
        .catch((err) => {
            // console.log('精确定位失败', err)
            return getIPLocation()
        })
}

/**
 * @description 获取当前所在地理位置，调用一次即重新定位一次，定位数据比较精确
 * @returns
 */
export const getGPSLocation = () => {
    const randomKey = getRandomKey()
    return new Promise((resolve, reject) => {
        let options = {
            timeout: 2000
        }
        let geolocation = new maps.Geolocation(randomKey.key, randomKey.app)
        // GPS精确定位接口
        geolocation.getLocation(
            (position) => {
                resolve(position)
            },
            () => reject(new Error('定位失败，请稍后重试~')),
            options
        )
    })
}

/**
 * @description 立即获取当前所在地理位置，适用于非精确定位场景，是IP定位，城市级别。
 * @returns
 */
export const getIPLocation = () => {
    const randomKey = getRandomKey()
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 如果2秒后不返回结果，则认为请求失败
            reject(new Error('定位失败，请稍后重试~'))
        }, 2000)
        let geolocation = new maps.Geolocation(randomKey.key, randomKey.app)
        // 通过IP获取地理位置
        geolocation.getIpLocation(
            (position) => {
                console.log('ip')
                resolve(position)
            },
            () => reject(new Error('定位失败，请稍后重试~'))
        )
    })
}
