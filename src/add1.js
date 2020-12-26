/**
 * 柯里化 
 * 
 * 实现一个add 函数
 * 
 * @param {*} fn 
 * @param  {...any} args 
 */
const curry = (fn, ...args) => {
    console.log(`length=${args.length},args=${args}`, fn.length);
    
    // 函数的参数个数可以直接通过"函数的.length"属性来访问
    return args.length >= fn.length
        // 传入的参数大于等于原始函数fn的参数个数，则直接执行该函数
        ? fn(...args)
        /**
         * 传入的参数小于原始函数fn的参数个数时
         * 则继续对当前函数进行柯里化，返回一个接受所有参数（当前参数和剩余参数） 的函数
         */
        : (..._args) => curry(fn, ...args, ..._args);
}

function add1(x, y, z) {
    return x + y + z;
}

const add = curry(add1);

// console.log(add(1, 2, 3)); // 6
// console.log(add(1)(2)(3)); // 6
console.log(add(1, 2)(3)); // 6
// console.log(add(1)(2, 3)); // 6
