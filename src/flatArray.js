// 数组扁平化

// 变成一维数组 方法一：递归
function flatArray1(arr = []) {
    let result = [];

    arr.forEach((item) => {
        if (Object.prototype.toString.call(item) === '[object Array]') {
            result = result.concat(flatArray1(item, []));
        } else {
            result.push(item);
        }
    });

    return result;
}

let arr = [1, 2, 3, [1, 2, [5], [1, 2, 3]]];
console.log(flatArray1(arr)); // [ 1, 2, 3, 1, 2, 5, 1, 2, 3 ]

// 方法二：利用toString() 扁平化数组
function flatArray2(arr) {
    // 先把多维数组先转换为字符串，再用逗号分隔符将字符串对象分割成字符串数组
    return arr.toString().split(',').map(item => parseFloat(item));
}
console.log(flatArray2(arr)); // [ 1, 2, 3, 1, 2, 5, 1, 2, 3 ]

// 方法三：利用JSON.stringify() 扁平化数组
function flatArray3(arr) {
    // 先序列化，替换掉数组的中括号，逗号分隔转成数组
    return JSON.stringify(arr).replace(/(\[|\])/g, '').split(',').map(item=>parseFloat(item));
}
console.log(flatArray3(arr)); // [ 1, 2, 3, 1, 2, 5, 1, 2, 3 ]

