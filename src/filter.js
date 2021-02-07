/**
 * 实现array的filter
 * 
 * @param {*} callbackFn 
 * @param {*} thisArg 
 */
Array.prototype.filter = function (callbackFn, thisArg) {
    if (this === null || this === undefined)
        throw new TypeError(`Cannot read property 'filter' of ${this}`)
    
    // 处理回调类型异常
    if (Object.prototype.toString.call(callbackFn) !== '[object Function]')
        throw new TypeError(`${callbackFn} is not a function`)

    let O = Object(this), // 规定 this 要先转化为对象
        resLen = 0,
        len = O.length >>> 0, // 保证 len 为数字且为整数
        res = []

    for (let i = 0; i < len; i++) {
        if (i in O) { // 原型链查找属性
            let element = O[i];
            
            if (callbackfn.call(thisArg, O[i], i, O)) 
                res[resLen++] = element
        }
    }
    return res
}
