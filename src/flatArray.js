// 数组扁平化

// 方法一：递归
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