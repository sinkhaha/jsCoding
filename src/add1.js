/**
 * 柯里化 
 * 
 * 实现一个add 函数
 * 
 * @param {*} fn 
 * @param  {...any} args 
 */
function curry(fn, currArgs) {
    return function () {
        // 数组化
        let args = [].slice.call(arguments);

        // 首次调用时，若未提供最后一个参数currArgs，则不用进行args的拼接
        if (currArgs !== undefined) {
            args = args.concat(currArgs);
        }

        // 递归调用
        if (args.length < fn.length) {
            return curry(fn, args);
        }

        // 递归出口
        return fn.apply(null, args);
    }
}

function add1(x, y, z) {
    return x + y + z;
}

const add = curry(add1);

console.log(add(1, 2, 3)); // 6
console.log(add(1)(2)(3)); // 6
console.log(add(1, 2)(3)); // 6
console.log(add(1)(2, 3)); // 6
