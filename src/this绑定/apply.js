
/**
 * 实现apply 数组
 * @param {*} context this要指向的对象
 */
Function.prototype.myApply = function (context) {
    // 要指向的对象不是对象，就新建个对象
    if (typeof context !== 'object') {
        context = Object.create(null);
    }    

    // 获取需要执行的函数，即this，如此时this是testFn方法
    context.fn = this;
    // console.log(`this对象是: ${this}`);

    // 获取要传入方法的参数
    let args = [...arguments][1];
    console.log(`args参数是: ${args}`); // args参数是: going,eat

    // 执行实际的方法
    let result = args
       ? context.fn(...args)
       : context.fn()

    delete context.fn;
    
    return result;
}


let person = { name: 'lisi' };

let testFn = function (a, b) {
    console.log(this.name, a, b);
}

// 测试，执行testFn，testFn里面的this指向person对象
testFn.myApply(person, ['going', 'eat']); // 输出lisi going eat

