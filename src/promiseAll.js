/**
 * promise的all实现
 * 
 * 仅考虑 promises 传入的是数组的情况时
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
        } else {
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
                    }
                }, err => {
                    return reject(err);
                });
            }
        }

    });
}

