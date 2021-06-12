
/**
 * 实现apply
 * @param {*} context 
 */
Function.prototype.myApply = function (context) {
    if (typeof context === 'object') {
        context = context;
    } else {
        context = Object.create(null);
    }

    // 获取需要执行的函数，即this，此时this是testFn方法
    context.fn = this;
    console.log(`this对象是: ${this}`);

    // 获取参数
    let args = [...arguments][1];
    console.log(`args参数是: ${args}`); // args参数是: going,eat

    let result;
    if (args) {
        result = context.fn(...args);
    } else {
        result = context.fn();
    }

    delete context.fn;
    return result;
}

let testFn = function (a, b) {
    console.log(this.name, a, b);
}

// 测试，调用testFn，this指向persion对象
let person = { name: 'lisi' }
testFn.myApply(person, ['going', 'eat']); // 输出lisi going eat

