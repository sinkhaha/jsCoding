/**
 * Promise的resolve实现
 *
 * Promise.resolve 静态方法梳理
 *
 * 1. 传参为一个 Promise，则直接返回它
 * 2. 传参为一个 thenable 对象，返回的 Promise 会跟随这个对象，采用它的最终状态作为自己的状态
 * 3. 其他情况，直接返回以该值为成功状态的 promise 对象
 *
 * @param {*} param 
 */
Promise.resolve = (param) => {
    // 符合 1
    if (param instanceof Promise) {
        return param;
    }
    return new Promise((resolve, reject) => {
        // 符合 2
        if (param && param.then && typeof param.then === 'function') { 
            // param 状态变为成功会调用resolve，将新 Promise 的状态变为成功，反之亦然
            param.then(resolve, reject);
        // 符合 3    
        } else { 
            resolve(param);
        }
    });
}
