/**
 * 柯里化加法，参数的个数“不固定”
 * 
 * 需求：实现一个add方法，使计算结果能够满足如下预期：
 * add(1)(2)(3) = 6;
 * add(1, 2, 3)(4) = 10;
 * add(1)(2)(3)(4)(5) = 15;
 * 
 */
/**
 * 实现方式1
 * @returns 
 */
function curryAdd() {
    // 在外部维护一个数组保存传递的变量
    let args_arr = [];

    let _add = function () {
        // 本次调用传入的参数  
        let _args = Array.prototype.slice.call(arguments);

        if (_args.length > 0) {
            args_arr = args_arr.concat(_args)
            // 再次返回闭包，等待下次调用         
            return _add;
        }

        // 执行时机，没有传递参数，执行累加返回(可以把操作抽成一个方法当做入参) 
        let sum = args_arr.reduce((total, current) => total + current);
        args_arr = []; // 置为空防止后面调用共用了该参数数组
        return sum;
    }

    // 返回一个闭包
    return _add;
}
console.log('========实现方式1=========');

let curryAddTest = curryAdd();
console.log(curryAddTest(1)(2)(3)()); // 6
console.log(curryAddTest(1, 2, 3)(4)()); // 10     
console.log(curryAddTest(1)(2)(3)(4)(5)()); // 15


/**
 * 实现方式2
 * 实现一个无限累加的函数，使用sum收集所有的累加项，使用valueOf进行计算
 * @param  {...any} args 
 */
function sum(...args) {
    const f = (...rest) => {
        // 递归
        return sum(...[...args, ...rest]);
    }

    // 统一计算
    f.valueOf = () => {
        return args.reduce((x, y) => x + y, 0);
    }

    return f;
}
console.log('========实现方式2=========');
console.log(sum(1, 2, 3).valueOf()); // 6
console.log(sum(1, 2)(3).valueOf()); // 6
console.log(sum(1)(2)(3).valueOf()); // 6
console.log(sum(1)(2, 3)(4).valueOf()); // 10

// 实现方式3
// 跟上面的类似，区别是把加法操作改成参数传入(自定义执行方法为乘法)
/**
 * 
 * @param {*} fn 自定义函数
 */
function currying(fn) {
    let args_arr = [];

    let closure = function () {
        let args = Array.prototype.slice.call(arguments);

        if (args.length > 0) {
            args_arr = args_arr.concat(args);
            return closure;
        }

        // 没有新的参数，执行函数后返回结果
        let result = fn(...args_arr);
        // 置为空，避免影响后面的调用
        args_arr = [];

        return result;
    }

    return closure;
}

/**
 * 乘法
 * @param  {...any} args 
 */
function multiply(...args) {
    return args.reduce((total, current) => total * current);
}

let curriedMultiply = currying(multiply);

console.log('========实现方式3=========');
console.log(curriedMultiply(2)()); // 2
console.log(curriedMultiply(2, 3)(4)()); // 24
console.log(curriedMultiply(2, 3)(4)(2)()); // 48
