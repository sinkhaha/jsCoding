// 需求：实现一个add方法，使计算结果能够满足如下预期：
// add(1)(2)(3) = 6;
// add(1, 2, 3)(4) = 10;
// add(1)(2)(3)(4)(5) = 15;

/**
 * 柯里化
 */
function add() {
    // 第一次执行时，定义一个数组专门用来存储所有的参数
    var _args = Array.prototype.slice.call(arguments);

    console.log('_args', _args);

    // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
    var _adder = function() {
        // 取得后面继续调用的参数
        console.log('arguments', ...arguments);

        _args.push(...arguments);
        return _adder;
    };

    console.log('_adder', _adder);

    // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
    _adder.toString = function () {
        return _args.reduce(function (a, b) {
            return a + b;
        });
    }

    return _adder;
}

// console.log(add(1)(2)(3).toString());               // 6
console.log(add(1, 2, 3)(4).toString());            // 10
// console.log(add(1)(2)(3)(4)(5).toString());         // 15
// console.log(add(2, 6)(1).toString());               // 9
