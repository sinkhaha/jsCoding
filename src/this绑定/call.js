
/**
 * 实现call
 * @param {*} context 
 */
Function.prototype.myCall = function (context) {
    if (typeof context === 'object') {
        context = context;
    } else {
        context = Object.create(null);
    }

    // this是当前方法，此时this是testFn方法
    context.fn = this;
    console.log(`this对象是: ${this}`);

    // 获取参数，例如此时是'going', 'eat'
    const args = [...arguments].slice(1);
    console.log(`args参数是: ${args}`);

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
let person = {
    name: 'lisi'
}
// 测试
testFn.myCall(person, 'going', 'eat'); // lisi going eat
