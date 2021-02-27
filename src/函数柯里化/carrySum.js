// 柯里化: 
// 是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，
// 并且返回接受余下的参数而且返回结果的新函数的技术。

// 主要目的:
// 为了减少函数传参，同时将一些固定参数私有化，返回一个接受剩余参数的函数。
// 其实就是使用闭包返回一个延迟执行函数。

// 好处:
// 1. 参数复用
// 2. 提前返回
// 3. 延迟运行/计算

// 参考 https://zhuanlan.zhihu.com/p/109881458


// 1. 通用柯里化的实现（固化一个参数）
/**
 * 
 * @param {*} fn 
 * @param  {...any} rest1 
 */
function commonCurrying(fn, ...rest1) {
    console.log('rest1', rest1); // ['张三']

    return function (...rest2) {
        return fn.apply(null, rest1.concat(rest2));
    }
}

// 实际要执行的函数
function eat(name, fruit) {
    console.log(`我叫 ${name}, 我吃 ${fruit}`);
}

// 将eat函数进行柯里化，'张三'这个参数已被固化，eat是实际要执行的函数
const curryingTest = commonCurrying(eat, '张三');

curryingTest('苹果'); // 我叫 张三, 我吃 苹果
curryingTest('西瓜'); // 我叫 张三, 我吃 西瓜

console.log('=================');






// 2. 高阶函数柯里化（如柯里化固定带有3个参数的加法函数）
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

console.log('=================');







/**
 * 3. 柯里化加法，参数的个数不固定
 * 
 * 需求：实现一个add方法，使计算结果能够满足如下预期：
 * add(1)(2)(3) = 6;
 * add(1, 2, 3)(4) = 10;
 * add(1)(2)(3)(4)(5) = 15;
 * 
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

let curryAddTest = curryAdd();
console.log(curryAddTest(1)(2)(3)()); // 6
console.log(curryAddTest(1, 2, 3)(4)()); // 10     
console.log(curryAddTest(1)(2)(3)(4)(5)()); // 15

console.log('=================');







// 4. 跟第3种类似，区别是加法操作是当成参数传入(自定义执行方法)
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

console.log(curriedMultiply(2)()); // 2
console.log(curriedMultiply(2, 3)(4)()); // 24
console.log(curriedMultiply(2, 3)(4)(2)()); // 48

console.log('=================');

