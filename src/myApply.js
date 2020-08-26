
/**
 * 实现apply
 * @param {*} context 
 */
Function.prototype.myApply = function(context) {
    if (typeof context === 'object') {
        context = context || window;
    } else {
        context = Object.create(null);
    }
      
    // 获取需要执行的函数
    context.fn = this; 
    console.log(`this: ${this}`);

    // 获取参数
    let args = [...arguments][1]; 
    console.log(`args: ${args}`);

    let result;
    if (args) {
        result = context.fn(...args);
    } else {
        result = context.fn();
    }

    delete context.fn;
    return result;
}

// test
let printInfoFn = function(a, b) {
    // name going eat
    console.log(this.name, a, b);
}
let person = { name: 'name' }
printInfoFn.myApply(person, ['going', 'eat']);
