/**
 * 扁平化对象
 * @param {*} obj 
 */
function flatten(obj) {
    var result = {};

    function recurse(src, prop) {
        var toString = Object.prototype.toString;
        // 为对象
        if (toString.call(src) == '[object Object]') {
            var isEmpty = true;
            for (var p in src) {
                isEmpty = false;
                recurse(src[p], prop ? prop + '.' + p : p)
            }
            if (isEmpty && prop) {
                result[prop] = {};
            }
        // 为数组    
        } else if (toString.call(src) == '[object Array]') {
            var len = src.length;
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