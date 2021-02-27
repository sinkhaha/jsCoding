// 高阶函数柯里化（如柯里化固定带有3个参数的加法函数）
// 
// 需求：实现一个add方法，使计算结果能够满足如下预期：
// curryAdd(1, 2, 3) // 6
// curryAdd(1)(2)(3) // 6
// curryAdd(1, 2)(3) // 6
// curryAdd(1)(2, 3) // 6
/**
 * @param {*} fn 
 * @param  {...any} currArgs 
 */
function curryThreeAdd(fn, currArgs) {
    return function () {
        // 类数组对象数组化
        let args = Array.prototype.slice.call(arguments);

        // 第一次调用时，currArgs是undefined
        // 不是第一次调用时，则拼接后面调用时传入的参数
        if (currArgs !== undefined) {
            args = args.concat(currArgs);
        }

        // 如果参数还少于add函数的参数，则递归调用
        if (args.length < fn.length) {
            return curryThreeAdd(fn, args);
        }

        // 执行函数的时机，参数符合被柯里化add函数的参数，则执行
        return fn.apply(null, args);
    }
}
/**
 * 实际执行的加法函数
 * @param {*} x 
 * @param {*} y 
 * @param {*} z 
 */
function add(x, y, z) {
    return x + y + z;
}

/**
 * 将add函数柯里化
 */
const curryThreeAddTest = curryThreeAdd(add);

console.log(curryThreeAddTest(1, 2, 3)); // 6
console.log(curryThreeAddTest(1)(2)(3)); // 6
console.log(curryThreeAddTest(1, 2)(3)); // 6
console.log(curryThreeAddTest(1)(2, 3)); // 6



