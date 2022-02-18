/**
 *
 * 一些特殊处理：
 * undefined => undefined
 * symbol => undefined
 * null => "null"
 * NaN/Infinity => "null"
 * function => undefined
 * RegExp => "{}"
 * Date => Date的toJSON字符串
 * 普通Object => 1.有toJSON方法，调toJSON方法 2.属性值出现undefined\任意的函数\symbol值，忽略 3.所有以symbol为属性键的属性都会被完全忽略掉
 * Array数组中出现了undefined\function\symbol => 替换成null
 * 
 * @param {*} data 
 * @returns 
 */
function jsonStringify(data) {
    let type = typeof data;

    // 处理非引用数据类型 注意NaN/Infinity/function/undefined/symbol需要特殊处理
    if (type !== 'object') {
        let result = data;
        if (Number.isNaN(data) || data === Infinity) {
            // NaN 和 Infinity 序列化返回 "null"
            result = "null";
        } else if (type === 'function' || type === 'undefined' || type === 'symbol') {
            // 由于 function 序列化返回 undefined，因此和 undefined、symbol 一起处理
            return undefined;
        } else if (type === 'string') {
            result = '"' + data + '"';
        }
        return String(result);
    } else if (type === 'object') {
        if (data === null) {
            return "null"
        } else if (data.toJSON && typeof data.toJSON === 'function') {
            // 对象可能内置toJSON方法来自定义序列化对象
            return jsonStringify(data.toJSON());
        } else if (data instanceof Array) { // 数组的处理
            let result = [];
            data.forEach((item, index) => {
                if (typeof item === 'undefined' || typeof item === 'function' || typeof item === 'symbol') {
                    result[index] = "null";
                } else {
                    result[index] = jsonStringify(item);
                }
            });
            result = "[" + result + "]";
            return result.replace(/'/g, '"');
        } else {
            // 处理普通对象
            let result = [];
            Object.keys(data).forEach((item, index) => {
                if (typeof item !== 'symbol') {
                    //key 如果是 symbol 对象，忽略
                    if (data[item] !== undefined && typeof data[item] !== 'function' && typeof data[item] !== 'symbol') {
                        //键值如果是 undefined、function、symbol 为属性值，忽略
                        result.push('"' + item + '"' + ":" + jsonStringify(data[item]));
                    }
                }
            });
            return ("{" + result + "}").replace(/'/g, '"');
        }
    }
}
