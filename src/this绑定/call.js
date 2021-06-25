
/**
 * 实现call 对象
 * @param {*} context 
 */
Function.prototype.myCall = function (context) {
    // 要指向的对象不是对象，就新建个对象
    if (typeof context !== 'object') {
        context = Object.create(null);
    }

    // this是当前方法，此时this是testFn方法
    context.fn = this;
    // console.log(`this对象是: ${this}`);

    // 获取参数，例如此时是'going', 'eat'
    const args = [...arguments].slice(1);
    console.log(`args参数是: ${args}`);

    // 执行实际的方法
    let result = args
        ? context.fn(...args)
        : context.fn()

    delete context.fn;

    return result;
}

let person = {
    name: 'lisi'
}
let testFn = function (a, b) {
    console.log(this.name, a, b);
}

// 测试，执行testFn，testFn里面的this指向person对象
testFn.myCall(person, 'going', 'eat'); // lisi going eat
