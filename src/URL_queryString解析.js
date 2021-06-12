/**
 * 解析url的查询字符串 queryString
 *
 */
/**
 * 实现方式1
 * 
 * @param {*} url
 */
function parseQueryString(url) {
    if (!url) {
        return {};
    }

    // 把?号前面的替换成空格
    url = url.replace(/^.*\?/, '');
    const queryArr = url.split('&');

    const result = {};
    queryArr.forEach(query => {
        let [key, value] = query.split('=');
        try {
            // URI解码
            key = decodeURIComponent(key || ''); //.replace(/\+/g, ' ');
            value = decodeURIComponent(value || ''); // .replace(/\+/g, ' ');
        } catch (e) {
            console.log('解码错误', e);
            throw e;
        }

        // key是数组或者是对象
        const type = getQueryType(key);

        switch (type) {
            case 'ARRAY':
                key = key.replace(/\[\]$/, '') // 对于形如 [] 的解析成数组
                if (!result[key]) {
                    result[key] = [value];
                } else {
                    result[key].push(value);
                }
                break;
            case 'JSON':
                key = key.replace(/\{\}$/, '') // 对于形如 {} 的解析为对象
                value = JSON.parse(value);
                result.json = value;
                break;
            default:
                result[key] = value;
        }
    });

    return result;
}

/**
 * 获取类型
 * @param {*} key 
 */
function getQueryType(key) {
    if (key.endsWith('[]')) 
        return 'ARRAY';
    if (key.endsWith('{}')) 
        return 'JSON';
    return 'DEFAULT';
}

// { 'name': 'lisi', age: '20', t: '1+1=2' }
console.log(parseQueryString('http://www.baidu.com?name=lisi&age=20&t=1%2B1%3D2'));

/**
 * 实现方法2：直接URLSearchParams实现
 * @param {*} url 
 */
function parseQueryString2(url) {
    url = url.replace(/^.*\?/, '');
    let searchObj = {};

    for (let [key, value] of new URLSearchParams(url)) {
        searchObj[key] = value
    }
    return searchObj
}

// { 'http://www.baidu.com?name': 'lisi', age: '20' }
console.log(parseQueryString2('http://www.baidu.com?name=lisi&age=20'));


/**
 * 实现方式3
 * @param {*} url 
 */
function parseQueryString3(url) {
    // 在 ? 与 # 之前的字符就是 qs，使用正则来抽取
    // \? 表示转移字符匹配问号
    // [^/?#:] 表示匹配未包含/ ? # :的任意字符，+表示匹配1次或多次
    // #?表示匹配井号0次或1次
    let result = url.match(/\?([^/?#:]+)#?/);
    console.log(result);
    if (!result) {
        return {};
    }

    // name=lisi&age=20
    queryString = result[1];
    if (!queryString) {
        return {};
    }

    queryObj = queryString.split('&').reduce((params, block) => {
        // 未赋值默认为空字符串
        const [_k, _v = ''] = block.split('=');

        // 通过 decodeURIComponent 来转义字符
        const k = decodeURIComponent(_k);
        const v = decodeURIComponent(_v);

        // 处理 key 出现多次的情况，设置为数组
        if (params[k] !== undefined) {
            params[k] = [].concat(params[k], v);
        } else {
            params[k] = v;
        }

        return params;
    }, {});

    return queryObj;
}

// { name: 'lisi', age: '20' }
console.log(parseQueryString3('http://www.baidu.com?name=lisi&age=20#hash'));
