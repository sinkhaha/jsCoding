/**
 * 去掉前后空格
 * @param {*} str 
 */
function trim(str) {
    // 正则将前空格和后空格替换为空
    return str.replace(/(^\s+)|(\s+$)/g, ''); 
}
