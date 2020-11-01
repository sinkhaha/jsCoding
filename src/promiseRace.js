/**
 * promise的race实现
 * @param {*} promise 
 */
let race = function (promise) {
    let promises = Array.from(promise);

    return new Promise(function (resolve, reject) {
        for (let i = 0; i < promises.length; i++) {
            Promise.resolve(promises[i]).then(data => {
                resolve(data);
            }, err => {
                return reject(err)
            });
        }
        
    });
}
