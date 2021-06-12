/**
 * 生成n位随机字符串
 * @param {*} len 
 */
function generateRandomString(len) {
    let randomStr = ''

    for (; randomStr.length < len; randomStr += Math.random().toString(36).substr(2)) { }

    return randomStr.substr(0, len)
}

console.log(generateRandomString(5));
