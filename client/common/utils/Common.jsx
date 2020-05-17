/**
 * @file Common.js
 * @desc 通用类
 * @author wangziqi
 * @data 2017/05/25
 * @update 2017/07/26
 */
import { getUserLocation } from '@/common/utils/loaction'
;(function (window, document) {
    // rem计算
    const recalc = function (e) {
        var ua = window.navigator.userAgent
        var docEl = document.documentElement
        var html = document.querySelector('html')
        var isAndorid = /Android/i.test(ua)
        var dpr = window.devicePixelRatio ? Math.floor(window.devicePixelRatio) : 1
        var rem = docEl.clientWidth / 10
        // console.log(dpr);
        // 设置 rem 基准值
        html.style.fontSize = rem + 'px'

        // Nexus 5 上 rem 值不准，
        // 如：设置100px，getComputedStyle 中的值却为 85px，导致页面错乱
        // 这时需要检查设置的值和计算后的值是否一样，
        // 不一样的话重新设置正确的值
        var getCPTStyle = window.getComputedStyle
        var fontSize = parseFloat(html.style.fontSize, 10)
        var computedFontSize = parseFloat(getCPTStyle(html)['font-size'], 10)
        if (getCPTStyle && Math.abs(fontSize - computedFontSize) >= 1) {
            html.style.fontSize = fontSize * (fontSize / computedFontSize) + 'px'
        }

        // 设置 data-dpr 属性，留作的 css hack 之用
        html.setAttribute('data-dpr', dpr)

        // 安卓平台额外加上标记类
        if (isAndorid) {
            html.setAttribute('data-platform', 'android')
        }
    }
    recalc()

    // 全局common类
    const common = {}
    window.common = common

    // 登陆
    common.goLogin = (goUrl) => {
        goUrl = goUrl || location.href
        var setting = common.getLoginCodeType()
        if (setting == 'wx' || setting == 'qq') {
            if (isWxapplet()) {
                wxJDK.miniProgram.redirectTo({
                    url:
                        '/pages/login/login?returnpage=' +
                        encodeURIComponent('/pages/webview/webview?url=' + encodeURIComponent(goUrl))
                })
            } else {
                window.location.href =
                    '//wq.jd.com/pinbind/pintokenredirect?biz=car' + '&url=' + encodeURIComponent(goUrl)
            }
        } else {
            window.location.href =
                '//passport.m.jd.com/user/login.action?v=t' + '&returnurl=' + encodeURIComponent(goUrl)
        }
    }
    // 获取文字长度
    common.getTextWidth = function (text, fontSize) {
        const size = fontSize || '0.6rem'
        let span = document.getElementById('__getwidth')
        if (span == null) {
            span = document.createElement('span')
            span.id = '__getwidth'
            document.body.appendChild(span)
            span.style.visibility = 'hidden'
            span.style.whiteSpace = 'nowrap'
        }
        span.innerText = text
        span.style.fontSize = size

        return span.offsetWidth
    }

    // iscrool 自定义参数列表
    common.iscrollOtions = {
        click: iScrollClick(),
        // 是否显示滚动条
        scrollbars: true,
        // 滚动条淡入淡出效果
        fadeScrollbars: true
    }

    // iscrool 自定义参数列表
    common.iscrollWrapperStyle = {
        height: '100%',
        overflow: 'hidden'
    }

    // 安卓4.4以下版本 iscroll click会执行2次
    function iScrollClick() {
        const myUserAgent = navigator.userAgent
        // 安卓机器
        if (myUserAgent !== null || myUserAgent !== 'undefined') {
            if (myUserAgent.indexOf('Android') !== -1) {
                const s = myUserAgent.substr(navigator.userAgent.indexOf('Android') + 8, 3)
                const osversion = parseFloat(s[0] + s[2])
                if (osversion < 44) {
                    return false
                }
                return true
            }
            return true
        }
        return true
    }

    // 针对于iphone机型input获取焦点时被遮挡的问题 scrollHeight=webview应该弹出高度
    common.resizeForInput = function (scrollHeight) {
        const deferTime = 500
        setTimeout(() => {
            if (window.carlife.nativeInfo.os === 'android') {
                console.log('android')
            } else {
                console.log('ios')
                console.log(document.body.scrollTop)
                if (document.body.scrollTop < 200) {
                    document.body.scrollTop = scrollHeight
                }
            }
        }, deferTime)
    }

    // 写入localStorage
    common.writeStorage = function (key, value) {
        localStorage.setItem(key, value)
    }

    // 读取localStorage
    common.readStorage = function (key) {
        return localStorage.getItem(key)
    }

    // 获取cookie
    common.getCookie = (name) => {
        // 传一个字符串以|;|隔开变量，看cookie中是否有name(变量)
        let reg = new RegExp('(^| )' + name + '(?:=([^;]*))?(;|$)')
        let val = document.cookie.match(reg)
        return val ? (val[2] ? unescape(val[2]) : '') : null
    }

    // 设置cookie
    common.setCookie = (name, value, expires, path, domain, secure) => {
        let exp = new Date()
        expires = arguments[2] || null
        path = arguments[3] || '/'
        domain = arguments[4] || null
        secure = arguments[5] || false
        expires ? exp.setMinutes(exp.getMinutes() + parseInt(expires)) : ''
        document.cookie =
            name +
            '=' +
            escape(value) +
            (expires ? ';expires=' + exp.toGMTString() : '') +
            (path ? ';path=' + path : '') +
            (domain ? ';domain=' + domain : '') +
            (secure ? ';secure' : '')
    }

    //  删除cookie
    common.delCookie = (name) => {
        let exp = new Date()
        exp.setTime(exp.getTime() - 1)
        let cval = this.getCookie(name)
        if (cval != null) {
            document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
        }
    }

    /**
     * 图片预先加载,加载完后执行回调
     * @param  {Array}   imagesUrl 预先加载的图片url数组
     * @param  {Function} callback  回调函数
     */
    common.loadImages = function (imagesArrUrl, callback) {
        if (!(imagesArrUrl instanceof Array)) {
            throw Error('image preload first parameter must be array.')
            return
        }

        // 总共待加载的图片数量
        const totalImages = imagesArrUrl.length
        // 已经加载成功的图片数量
        let count = 0

        // 单个图片onload 的回调
        function imgLoaded(img) {
            img = img.onload = null
            count++
            if (count === totalImages) {
                callback()
            }
        }

        imagesArrUrl.forEach((itemUrl) => {
            const img = new Image()
            // 如果图片已存在
            if (img.complete) {
                imgLoaded(img)
            }
            img.onload = imgLoaded.bind(null, img)
            img.src = itemUrl
        })
    }

    /**
     * 格式化字符串
     * @param {string} value 需要格式化的值
     * @return {string} 修改后的值
     */
    common.formatText = (value) => {
        const result = value.replace(/^(\d{3})$/g, '$1 ').replace(/(\d{4})(?=\d)/g, '$1 ')
        return result
    }

    common.formatPhone = (value) => {
        const result = value.replace(/^(\d{3})(?=\d)/g, '$1 ').replace(/(\d{4})(?=\d)/g, '$1 ')
        return result
    }

    common.formatOrder = (value) => {
        const result = value.replace(/(\d{4})(?=\d)/g, '$1 ')
        return result
    }

    /**
     * 格式化字符串 去空格
     * @param {string} value 需要格式化的值
     * @return {*} 修改后的值
     */
    common.formatTextForTirm = (value) => {
        const result = value.replace(/\s/g, '')
        return result
    }

    common.formatCode = (value) => {
        const result = value.replace(/([a-z]{4})(?=[a-z])/gi, '$1 ')
        return result
    }

    common.formatExchangeCode = (value) => {
        if (value.length > 19) {
            value = value.substr(0, 19)
        }
        if (common.isOnlyContainLetter(value) && value.substr(value.length - 1) != ' ') {
            return common.formatCode(value)
        }
        return common.formatCode(value.substr(0, value.length - 1))
    }

    // 判断字符串中是否仅仅包含数字
    common.isOnlyContainDigit = (value) => {
        // 去除空格
        const tmp = value.replace(/\s+/g, '')
        return /^\d+$/.test(tmp)
    }

    // 判断字符串是否仅仅包含大小写字母
    common.isOnlyContainLetter = (value) => {
        // 去除空格
        const tmp = value.replace(/\s+/g, '')
        return /^[a-z]+$/i.test(tmp)
    }

    // 计算地图上两个坐标点之间的距离
    common.getDistance = (sSrcPointX, sSrcPointY, sDesPointX, sDesPointY) =>
        Math.sqrt(Math.pow(sDesPointX - sSrcPointX, 2) + Math.pow(sDesPointY - sSrcPointY, 2))

    // 数组 find 方法的 Polyfill
    if (!Array.prototype.find) {
        Object.defineProperty(Array.prototype, 'find', {
            value(predicate) {
                if (this == null) {
                    throw new TypeError('"this" is null or not defined')
                }
                const o = Object(this)
                const len = o.length >>> 0
                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function')
                }
                const thisArg = arguments[1]
                let k = 0
                while (k < len) {
                    const kValue = o[k]
                    if (predicate.call(thisArg, kValue, k, o)) {
                        return kValue
                    }
                    k++
                }
                return undefined
            }
        })
    }

    // 区分ios与android系统
    common.isAndroid = () => {
        const osInfo = navigator.userAgent && navigator.userAgent.toUpperCase()
        return osInfo && osInfo.indexOf('ANDROID') > -1
    }

    // 区分是否在微信浏览器中
    common.getLoginCodeType = () => {
        var loginCodeType = ''
        var ua = navigator.userAgent.toLowerCase()
        var isWX = window.WeixinJSBridge
        var isMQQ = false
        var isApp = false
        if (!isWX) {
            isWX = ua.match(/micromessenger/) ? true : false
        }
        if (/qq\/([\d\.]+)*/.test(ua)) {
            // eslint-disable-line
            isMQQ = true
        }
        isApp = ua.match(/jdapp/) ? true : false
        if (!isApp) {
            isApp = ua.match(/jdcar_ios/) || ua.match(/jdcar_android/) ? true : false
        }
        if (isWX) {
            loginCodeType = 'wx'
        } else if (isMQQ) {
            loginCodeType = 'qq'
        } else if (isApp) {
            loginCodeType = 'app'
        } else {
            loginCodeType = 'h5'
        }
        return loginCodeType
    }
    /*判断是否在小程序环境里*/
    common.isWxapplet = () => {
        var setting = getLoginCodeType()
        var ua = navigator.userAgent.toLowerCase()
        if (setting == 'wx' || setting == 'qq') {
            if (ua.indexOf('miniprogram') != -1) {
                // alert('小程序环境')
                return true
            } else {
                // alert('微信环境')
                return false
            }
        }
        try {
            if (window.__wxjs_environment) {
                // alert('h5环境')
                return true
            }
        } catch (e) {
            log(e)
        }
    }

    common.isIos = () => {
        const ua = window.navigator.userAgent.toLowerCase()
        const iosReg = /ip(hone|ad|od)/i
        return iosReg.test(ua)
    }

    common.setTitle = (title) => {
        // 解决ios webview下document.title 不能修改title的hack问题（微信、地图）
        setTimeout(() => {
            // 利用iframe的onload事件刷新页面
            document.title = title
            const iframe = document.createElement('iframe')
            iframe.style.visibility = 'hidden'
            iframe.style.width = '1px'
            iframe.style.height = '1px'
            iframe.onload = function () {
                setTimeout(() => {
                    document.body.removeChild(iframe)
                }, 0)
            }
            document.body.appendChild(iframe)
        }, 0)
    }

    // 初始化屏幕webview高度
    common.webViewHeight = window.document.body.offsetHeight

    // 分享
    common.share = () => {
        setTimeout(() => {
            if (window.cltool) {
                let url = window.location.href
                if (url) {
                    const temp = url.split('?')
                    if (temp) {
                        url = temp[0]
                    }
                }

                window.myShare.setShareContent(
                    {
                        // 实例化分享插件，传入分享参数
                        domId: '#btnShare', // 绑定的分享按钮ID
                        title: '分享标题', // 分享title
                        desc: '分享内容！', // 分享内容
                        url, // 分享跳转链接
                        imgUrl: '', // 分享图片链接，尺寸要求300*300，正方形
                        isbrowserShare: false // 默认为false，true表示非微信、百度地图、百度糯米下也有分享弹窗（只支持微信扫二维码分享和网页微博分享）；false表示 非微信、百度地图、百度糯米下的浏览器，不支持分享
                    },
                    {
                        shareIconClickCb() {
                            // 分享按钮触发点击事件后的回调，一般用于统计埋点
                            // alert('分享按钮点击事件');
                        }
                    }
                )
            }
        }, 500)
    }

    /**
     *  将url中的参数  a=1&b=2 转成对象 { a: 1, b: 2 }
     *
     * @param {String} str
     * @returns {Object}
     */

    function parseUrlSringToObject(str) {
        const obj = {}
        if (!str) {
            return {}
        }
        const arr = str.split('&')
        for (let index = 0; index < arr.length; index++) {
            const [k, v = null] = arr[index].split('=')
            if (v) {
                // 判断a=&b=2的情况 去掉a
                obj[k] = v
            }
        }

        return obj
    }

    /**
     *
     * 将 { a:1, b:2 } 转成 a=1&b=2
     * @param {Object} obj
     * @returns @returns {String}
     */
    function parseObjectToUrlString(obj) {
        const arr = []
        for (const k in obj) {
            if (obj.hasOwnProperty(k)) {
                arr.push(`${k}=${obj[k]}`)
            }
        }

        return arr.join('&')
    }

    function getParamsFromUrl() {
        if (window.location.hash.indexOf('?') !== -1) {
            return parseUrlSringToObject(window.location.hash.split('?').pop())
        }

        if (window.location.href.indexOf('?') !== -1) {
            return parseUrlSringToObject(window.location.href.split('?').pop().split('#')[0])
        }

        return {}
    }

    function isEmpty(obj) {
        // null and undefined are "empty"
        if (obj == null) return true

        // Assume if it has a length property with a non-zero value
        // that that property is correct.
        if (obj.length > 0) return false
        if (obj.length === 0) return true

        // If it isn't an object at this point
        // it is empty, but it can't be anything *but* empty
        // Is it empty?  Depends on your application.
        if (typeof obj !== 'object') return true

        // Otherwise, does it have any properties of its own?
        // Note that this doesn't handle
        // toString and valueOf enumeration bugs in IE < 9
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) return false
        }

        return true
    }

    // 获取URL参数
    common.fetchNAParams = () =>
        new Promise((resolve) => {
            const obj = getParamsFromUrl()
            resolve(obj)
        })

    common.getAndroidVersion = () => {
        const myUserAgent = navigator.userAgent
        // 安卓机器
        if (myUserAgent !== null || myUserAgent !== 'undefined') {
            if (myUserAgent.indexOf('Android') !== -1) {
                const s = myUserAgent.substr(navigator.userAgent.indexOf('Android') + 8, 3)
                const osversion = parseFloat(s[0] + s[2])
                if (osversion === 60) {
                    return false
                }
                return true
            }
            return true
        }
        return true
    }

    common.versionCompare = (ver1, ver2) => {
        const version1pre = parseFloat(ver1)
        const version2pre = parseFloat(ver2)
        const version1next = ver1.replace(`${version1pre}.`, '')
        const version2next = ver2.replace(`${version2pre}.`, '')
        if (version1pre > version2pre) {
            return true
        }
        if (version1pre < version2pre) {
            return false
        }
        if (version1next >= version2next) {
            return true
        }
        return false
    }

    common.isNull = (obj) => !obj && obj !== false && obj !== 0

    /**
     * 向url追加参数
     * param: string or object
     */
    common.appendParamToUrl = (url, param) => {
        let paramString = ''
        if (param === null || param === 'undefined') {
            return url
        }

        if (!url) {
            return ''
        }

        if (Object.prototype.toString.call(param) === '[object Object]') {
            for (const key in param) {
                if (param.hasOwnProperty(key)) {
                    paramString += `${key}=${encodeURIComponent(param.requestPara[key])}&`
                }
            }
        } else if (typeof param === 'string') {
            paramString = param
        }

        if (url.substr(url.length - 1) === '?') {
            url += paramString
        } else {
            url = `${url}?${paramString}`
        }

        return url
    }

    /**
     * 判断是否为DOM对象
     * @param obj
     */
    common.isDom = (obj) => {
        if (typeof obj === 'object') {
            if (obj instanceof HTMLElement) {
                return true
            }
            return false
        }
        return false
    }

    /**
     * 判断某对象在数组中的index
     * @param obj Object
     * @param list Array
     * @return index Int
     */
    common.getObjectInArrayIndex = (obj, list) => {
        if (!list || !(list instanceof Array)) {
            return -1
        }
        if (!obj) {
            return -1
        }

        return list.indexOf(list.filter((item) => JSON.stringify(item) === JSON.stringify(obj))[0])
    }
    //判断参数不为null
    common.isNotEmpty = (text) => {
        return !isEmpty(text)
    }

    //判断参数为null
    common.isEmpty = (text) => {
        if (typeof text == 'object') {
            //判断是否为空对象
            for (var x in text) {
                return false
            }
            return true
        } else {
            if (text == null || text == undefined || text == 'undefined' || text == '' || text == 'null') {
                return true
            } else {
                return false
            }
        }
    }

    // 对象的深拷贝
    common.deepCopyObject = (obj) => {
        return JSON.parse(JSON.stringify(obj))
    }

    // 数组扁平化
    common.flattenArr = (arr) => {
        return arr.reduce(
            (a, b) => [].concat(Array.isArray(a) && a ? flattenArr(a) : a, Array.isArray(b) && b ? flattenArr(b) : b),
            []
        )
    }

    //设置用户地址，坐标信息
    common.setUserAddress = (response) => {
        let mainData = {}
        if (response.code == 0 && response.data != null && response.data.defaultAddress) {
            let item
            if (response.data.defaultAddress instanceof Array && response.data.defaultAddress.length > 0) {
                item = response.data.defaultAddress[0]
            } else {
                item = response.data.defaultAddress
            }
            common.setCookie('person_area1', item.provinceId, 10000, '/')
            common.setCookie('person_area2', item.cityId, 10000, '/')
            common.setCookie('person_area3', item.countyId, 10000, '/')
            common.setCookie('person_area4', item.townId, 10000, '/')
            let myPara = item.provinceId + '_' + item.cityId + '_' + item.countyId + '_' + item.townId
            common.setCookie('person_area', myPara, 10000, '/')
            // setCookie('person_provinceName', item.provinceName  + '市')
            common.setCookie('person_provinceName', item.provinceId > 4 ? item.cityName : item.provinceName + '市')
            // console.log(common.getCookie('person_provinceName'))
        } else {
            common.setCookie('person_area1', '1', 10000, '/')
            common.setCookie('person_area2', '72', 10000, '/')
            common.setCookie('person_area3', '2799', 10000, '/')
            common.setCookie('person_area4', '0', 10000, '/')
            common.setCookie('person_area', '1_72_2799_0', '/')
            common.setCookie('person_provinceName', '北京市')
        }
        getUserLocation()
            .then((result) => {
                common.setCookie('longitude', result.lng)
                common.setCookie('latitude', result.lat)
            })
            .catch((err) => {
                console.log(common)
                common.setCookie('latitude', 39.907687) // 设置用户纬度
                common.setCookie('longitude', 116.397625) // 设置用户经度
            })
        let provinceCode = common.getCookie('person_area1') ? common.getCookie('person_area1') : '1'
        let cityCode = common.getCookie('person_area2') ? common.getCookie('person_area2') : '2810'
        let areaCode = common.getCookie('person_area3') ? common.getCookie('person_area3') : '51081'
        let lng = common.getCookie('longitude') ? common.getCookie('longitude') : '39.72684'
        let lat = common.getCookie('latitude') ? common.getCookie('latitude') : '116.34159'
        let selsctItemIds = JSON.parse(sessionStorage.getItem('SELECT_ITEMIDS'))
        mainData = {
            // carUserModelId: defaultCar.id,
            // modelId: defaultCar.modelId,
            typeIds: selsctItemIds || '',
            // mileages: defaultCar.mileage || '',
            lng: lng ? lng : '',
            lat: lat ? lat : '',
            provinceCode: provinceCode,
            cityCode: cityCode,
            areaCode: areaCode
        }
        return mainData
    }

    common.fullImg = (src, size, host) => {
        const _size = size || '100x100'
        const _host = host || '//img13.360buyimg.com/charity/s'
        return `${_host}${_size}_${src}`
    }
})(window, document)
