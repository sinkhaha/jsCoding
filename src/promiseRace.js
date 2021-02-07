/**
 * promise的race实现
 * 
 * 列表里哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态
 * 
 * @param {*} promise 
 */
Promise.race = function (promise) {
    let promises = Array.from(promise);

    return new Promise(function (resolve, reject) {
        for (let i = 0; i < promises.length; i++) {
            Promise.resolve(promises[i]).then(data => {
                // 出现第一个被resolve的直接resolve
                resolve(data);
                return;
            }).catch(err => {
                reject(err);
                return;
            });
        }
    });
}
