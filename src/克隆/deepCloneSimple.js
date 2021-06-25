/**
 * 最简单的深拷贝(只处理普通对象和数组)
 * @param {*} source 
 */
function simpleDeepClone(source) {
    if (!isObject(source) && !Array.isArray(source)) {
        return source;
    }

    let newObj = Array.isArray(source)
        ? []
        : {};

    for (let key in source) {
        if (source.hasOwnProperty(key)) {
            newObj[key] = typeof source[key] === 'object'
                ? simpleDeepClone(source[key]) // 递归执行
                : source[key]; // 不是对象和数组直接返回
        }
    }

    return newObj;
}

/**
 * 判断是否对象
 * @param {*} x 
 */
function isObject(x) {
    return Object.prototype.toString.call(x) === '[object Object]';
}


const source = {
    name: 'lisi',
    info: {
        age: 25,
        hobby: ['football', 'swimming', { count: 1 }]
    },
    address: ['china', 'guangdong']
}

const newObj = simpleDeepClone(source);
console.log(newObj);

source.address = ['beijing'];
source.info.hobby[2].count = 2;
console.log(source);
console.log(source.info.hobby[2].count); // 2
console.log(newObj);
console.log(newObj.info.hobby[2].count); // 1
