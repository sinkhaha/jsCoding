/**
 * 思路
 * 1. 遍历数组
 * 2. 把数组里的对象排序后转成字符串存到set中
 * 3. 再把set里的字符串转成对象
 * 
 * @param {*} arr 
 * @returns 
 */
function unique(arr) {
    let set = new Set();

    for (let i = 0; i < arr.length; i++) {
        // 把对象按key排序，然后再转成字符串
        let str = objSort(arr[i]);
        set.add(str);
    }

    // 将数组中的字符串转回对象
    arr = [...set].map(item => {
        return JSON.parse(item);
    });

    return arr;
}

/**
 * 把对象按key排序，然后再转成字符串
 * @param {*} obj 
 * @returns 
 */
function objSort(obj) {
    let newObj = {};

    // 遍历对象，并将key进行排序
    Object.keys(obj).sort().map(key => {
        newObj[key] = obj[key];
    });

    // 将排序好的对象转成字符串
    return JSON.stringify(newObj);
}

const objArr = [
    { a: 1, b: 2, c: 3 },
    { b: 2, c: 3, a: 1 },
    { d: 2, c: 2 }
];
// [ { a: 1, b: 2, c: 3 }, { c: 2, d: 2 } ]
console.log(unique(objArr));
