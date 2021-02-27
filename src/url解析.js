/**
 * 解析url
 * 
 * scheme:// user:passwd@ host:port path?query #fragment
 * 
 * 如 https://keith:miao@www.foo.com:80/file?test=3&miao=4#heading-0
 * 
 * @param {*} url 
 */
function parseUrl(url) {
    // scheme://user:passwd@ 部分
    // ?:patten是获取但是非匹配
    let schemeStr = '(?:([^/?#]+))?//(?:([^:]*)(?::?(.*))@)?';
    // host:port path?query 部分
    let urlStr = '(?:([^/?#:]*):?([0-9]+)?)?([^?#]*)(\\?(?:[^#]*))?';
    // #fragment 部分
    let	fragmentStr = '(#(?:.*))';
        
    let pattern = RegExp(`^${schemeStr}${urlStr}${fragmentStr}?`);
    let matched = url.match(pattern) || [];

    // console.log(matched);
    return {
    	protocol: matched[1], // 协议
    	username: matched[2], // 用户名
    	password: matched[3], // 密码
    	hostname: matched[4], // 主机
    	port: matched[5],     // 端口
    	pathname: matched[6], // 路径
    	search: matched[7],   // 查询字符串 queryString
    	hash: matched[8],     // 锚点
    }
}

console.log(parseUrl('http://www.baidu.com?name=lisi&age=20'));
// {
//     protocol: 'http:',
//     username: undefined,
//     password: undefined,
//     hostname: 'www.baidu.com',
//     port: undefined,
//     pathname: '',
//     search: '?name=lisi&age=20',
//     hash: undefined
// }

/**
 * 或者直接用URL实现
 * @param {*} url 
 */
function parseUrl2(url) {
    const urlObj = new URL(url)
    return {
    	protocol: urlObj.protocol,
        username: urlObj.username,
        password: urlObj.password,
        hostname: urlObj.hostname,
        port: urlObj.port,
        pathname: urlObj.pathname,
        search: urlObj.search,
        hash: urlObj.hash
    }
}

console.log(parseUrl2('https://www.baidu.com?name=lisi&age=20'));
