/**
 * arguments类数组对象转成数组的4种方法
 */

// 1. Array.prototype.slice.call()
function sum1() {
    let args = Array.prototype.slice.call(arguments);
    console.log(args.reduce((sum, cur) => sum + cur));
}
sum1(1, 2); // 3

// 2. Array.from()
function sum2() {
    let args = Array.from(arguments);
    console.log(args.reduce((sum, cur) => sum + cur));
}
sum2(1, 2);

// 3. ES6展开运算符
function sum3() {
    let args = [...arguments];
    console.log(args.reduce((sum, cur) => sum + cur));
}
sum3(1, 2);

// 4. 利用concat+apply
function sum4() {
    // apply方法会把第二个参数展开
    let args = Array.prototype.concat.apply([], arguments);
    console.log(args.reduce((sum, cur) => sum + cur));
}
sum4(1, 2);
