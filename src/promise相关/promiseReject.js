/**
 * Promise的reject实现
 * @param {*} reason 
 */
Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
        reject(reason);
    });
}
