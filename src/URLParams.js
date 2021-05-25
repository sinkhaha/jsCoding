/**
 * 解析 URL Params 为对象
 * @param {*} url 
 * @returns 
 */
function parseParam(url) {
    // 将 ? 后面的字符串取出来
    const paramsStr = /.+\?(.+)$/.exec(url)[1];
    // 将字符串以 & 分割后存到数组中
    const paramsArr = paramsStr.split('&');

    let paramsObj = {};

    // 将 params 存到对象中
    paramsArr.forEach(param => {
        // 处理有 value 的参数
        if (/=/.test(param)) {
            // 分割 key 和 value
            let [key, val] = param.split('=');
            val = decodeURIComponent(val); // 解码

            // 判断是否转为数字
            val = /^\d+$/.test(val)
                ? parseFloat(val)
                : val;
            // 如果对象有 key，则添加一个值
            if (paramsObj.hasOwnProperty(key)) {
                paramsObj[key] = [].concat(paramsObj[key], val);
            } else { // 如果对象没有这个 key，创建 key 并设置值
                paramsObj[key] = val;
            }
        } else { // 处理没有 value 的参数
            paramsObj[param] = true;
        }
    })

    return paramsObj;
}

let url = 'http://www.baidu.com/?user=xiaoming&id=666&id=123456&city=%E5%8C%97%E4%BA%AC&enabled';
console.log(parseParam(url));
// {
//     user: 'xiaoming', 
//     id: [ 666, 123456 ], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
//     city: '北京', // 中文解码
//     enabled: true // 未指定值的key，值为true
// }