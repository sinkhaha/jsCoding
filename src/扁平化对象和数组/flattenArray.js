// 数组扁平化(变成一维数组)

/**
 * 方法一：递归，核心 [].concat(...arr)
 * @param {*} arr 
 */
function flatArray1(arr = []) {
    let result = [];

    arr.forEach((item) => {
        if (isArray(item)) {
            // 递归
            result = result.concat(flatArray1(item));
        } else {
            result.push(item);
        }
    });

    return result;
}

/**
 * 方法二：利用toString()
 * @param {*} arr 数组元素为数字
 */
function flatArray2(arr) {
    // 先把多维数组先转换为字符串，再用逗号分隔符将字符串对象分割成字符串数组
    return arr.toString()
        .split(',')
        .map(item => parseFloat(item));
}

/**
 * 方法三：利用JSON.stringify()
 * @param {*} arr 数组元素为数字
 */
function flatArray3(arr) {
    // 先序列化，替换掉数组的中括号，逗号分隔转成数组
    return JSON.stringify(arr)
        .replace(/(\[|\])/g, '')
        .split(',')
        .map(item => parseFloat(item));
}

/**
 * 方法四：用reduce实现，核心[].concat(...arr)
 * @param {*} arr 
 */
function flatArray4(arr) {
    return arr.reduce((pre, cur) => {
        // 递归
        return pre.concat(isArray(cur) ? flatArray4(cur) : cur);
    }, []);
}

/**
 * 测试
 */
function test() {
    let arr = [1, 2, 3, 4, 5, 7.5, [8, 4, [5], [1, 2, 3]]];
    console.log(flatArray1(arr));
    console.log(flatArray2(arr));
    console.log(flatArray3(arr));
    console.log(flatArray4(arr));
}

test();

/**=========================================================== */
/**
 * 检查是否为数组
 * @param {*} value 
 */
function isArray(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
}