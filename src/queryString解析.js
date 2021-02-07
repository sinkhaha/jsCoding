/**
 * 单独解析查询字符串 queryString
 * 
 * @param {*} query
 */
function parseQueryString(query) {
    if (!query) {
        return {}
    }

    query = query.replace(/^\?/, '')
    const queryArr = query.split('&')
    const result = {}

    queryArr.forEach(query => {
        let [key, value] = query.split('=')
        try {
            key = decodeURLComponent(key || '').replace(/\+/g, ' ')
            value = decodeURLComponent(value || '').replace(/\+/g, ' ')
        } catch (e) {
            return console.log(e) // 非法字符不处理
        }

        const type = getQueryType(key)

        switch (type) {
            case 'ARRAY':
                key = key.replace(/\[\]$/, '') // 对于形如 `list[]` 的解析成数组
                if (!result[key]) {
                    result[key] = [value]
                } else {
                    result[key].push(value)
                }
                break;
            case 'JSON':
                key = key.replace(/\{\}$/, '') // 对于形如 obj{} 的解析为对象
                value = JSON.parse(value)
                result.json = value
                break;
            default:
                result[key] = value
        }
    })
    return result
}

function getQueryType(key) {
    if (key.endsWith('[]')) 
        return 'ARRAY'
    if (key.endsWith('{}')) 
        return 'JSON'
    
    return 'DEFAULT'
}

/**
 * 或者直接URLSearchParams实现
 * @param {*} search 
 */
function getUrlQuery(search) {
    let searchObj = {};
    for (let [key, value] of new URLSearchParams(search)) {
        searchObj[key] = value
    }
    return searchObj
}
