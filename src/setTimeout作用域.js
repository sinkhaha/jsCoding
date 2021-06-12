// 以下例子
// 为什么会全部输出6？
// 
// 如何改进，让它输出1，2，3，4，5
//
// 因为setTimeout为宏任务，由于JS中单线程eventLoop机制
// 在主线程同步任务执行完后才去执行宏任务，因此循环结束后setTimeout中的
// 回调才依次执行，但输出i的时候当前作用域没有，往上一级再找，发现了i,此时循环
// 已经结束，i变成了6。因此会全部输出6
for (var i = 1; i <= 5; i++) {
    setTimeout(function timer() {
        console.log(i);
    }, 0);
}

// 解决方式1
// 利用IIFE(立即执行函数表达式)当每次for循环时，把此时的i变量传递到定时器中
for (var i = 1; i <= 5; i++) {
    (function (j) {
        setTimeout(function timer() {
            console.log(j);
        }, 0);
    })(i);
}

// 解决方式2
// 给定时器传入第三个参数, 作为timer函数的第一个函数参数
for (var i = 1; i <= 5; i++) {
    setTimeout(function timer(j) {
        console.log(j);
    }, 0, i);
}

// 解决方式3
// 使用ES6中的let
for (let i = 1; i <= 5; i++) {
    setTimeout(function timer() {
        console.log(i);
    }, 0);
}
