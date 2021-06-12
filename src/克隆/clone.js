/**
 * 浅拷贝
 * @param {*} obj 
 */
function copy(obj) {
    let result = Array.isArray(obj) 
        ? [] 
        : {};

    Object.keys(obj).forEach(key => result[key] = obj[key]);

    return result;
}