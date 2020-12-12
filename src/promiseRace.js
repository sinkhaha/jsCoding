/**
 * promise的race实现
 * @param {*} promise 
 */
Promise.race = function (promise) {
    let promises = Array.from(promise);

    return new Promise(function (resolve, reject) {
        for (let i = 0; i < promises.length; i++) {
            Promise.resolve(promises[i]).then(data => {
                // 出现第一个被resolve的直接resolve
                resolve(data);
            }, err => {
                return reject(err)
            });
        }
    });
}
