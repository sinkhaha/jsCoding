/**
 * promise的all实现
 * 
 * 仅考虑 promises 传入的是数组的情况时
 * 
 * 1. 传入参数为一个空的可迭代对象，则直接进行 resolve
 * 2. 如果参数中有一个promise 失败，那么 Promise.all 返回的 promise 对象失败
 * 3. 在任何情况下，Promise.all 返回的 promise 的完成状态的结果都是一个数组
 *
 * @param {*} promise 
 */
Promise.all = function (promise) {
    // 将iterator转换为数组，如果不是一个可迭代对象，不会报错，会返回空数组
    let promises = Array.from(promise);

    return new Promise((resolve, reject) => {
        // 如果数组长度为0则返回空数组
        if (promises.length === 0) {
            resolve([]);
            return;
        }

        let result = []; // 存放已成功的异步操作
        let index = 0; // 记录已成功的操作数
        for (let i = 0; i < promises.length; i++) {
            // 执行每一个promise
            Promise.resolve(promises[i]).then(data => {
                result[i] = data;
                index++;
                // 所有promises状态都是fulfilled才返回
                if (index === promises.length) {
                    resolve(result);
                    return;
                }
            // 失败的时候则返回最先被reject失败状态的值    
            }).catch(err => {
                reject(err);
                return;
            });
        }

    });
}
