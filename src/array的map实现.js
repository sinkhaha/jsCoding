/**
 * 实现array的map
 * 
 * @param {*} callbackFn 
 * @param {*} thisArg 
 */
Array.prototype.map = function (callbackFn, thisArg) {
    if (this === null || this === undefined)
        throw new TypeError(`Cannot read property 'map' of ${this}`);

    // 处理回调类型异常
    if (Object.prototype.toString.call(callbackFn) !== '[object Function]')
        throw new TypeError(`${callbackFn} is not a function`);

    let O = Object(this), // 规定 this 要先转化为对象
        T = thisArg,
        len = O.length >>> 0, // 保证 len 为数字且为整数
        A = new Array(len);

    for (let k = 0; k < len; k++) {
        if (k in O) { // 原型链查找属性
            let mappedValue = callbackFn.call(T, O[k], k, O);
            A[k] = mappedValue;
        }
    }

    return A;
}
