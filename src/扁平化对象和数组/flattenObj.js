/**
 * 扁平化对象
 * 
 * 递归
 * 
 * @param {*} obj 
 */
function flatten(obj) {
    let result = {};

    function recurse(src, prop) {
        let toString = Object.prototype.toString;
        // 对象处理
        if (toString.call(src) == '[object Object]') {
            let isEmpty = true;
            for (let p in src) {
                isEmpty = false;
                recurse(src[p], prop ? prop + '.' + p : p)
            }
            if (isEmpty && prop) {
                result[prop] = {};
            }
            // 数组处理
        } else if (toString.call(src) == '[object Array]') {
            let len = src.length;
            if (len > 0) {
                src.forEach(function (item, index) {
                    recurse(item, prop ? prop + '.[' + index + ']' : index);
                })
            } else {
                result[prop] = [];
            }
        } else {
            result[prop] = src;
        }
    }

    // 递归
    recurse(obj, '');
    return result;
}

const obj = {
    a: {
        b: {
            d: ['name']
        },
        c: '哈哈',
        e: ['age']
    }
}
// { 'a.b.d.[0]': 'name', 'a.c': '哈哈', 'a.e.[0]': 'age' }
console.log(flatten(obj));