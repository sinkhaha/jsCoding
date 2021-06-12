/**
 * 实现Object.assign方法
 * 
 * assign方法是浅拷贝
 * 
 * @param {*} target 
 * @param  {...any} source 
 * @returns 
 */
Object.assign = function (target, ...source) {
    if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object')
    }

    let ret = Object(target);

    source.forEach(function (obj) {
        if (obj != null) {
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    ret[key] = obj[key];
                }
            }
        }
    });

    return ret;
}