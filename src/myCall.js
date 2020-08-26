
/**
 * 实现call
 * @param {*} context 
 */
Function.prototype.myCall = function(context) {
    if (typeof context === 'object') {
        context = context;
    } else {
        context = Object.create(null);
    }

    // this 当前方法
    context.fn = this;

    // 获取参数，如此时是'going', 'eat'
    const args = [...arguments].slice(1);
    console.log(`args: ${args}`);

    let result = context.fn(...args);
    delete context.fn;
    return result;
}

// test
let printInfoFn = function(a, b) {
    // 'name going eat'
    console.log(this.name, a, b);
}
let person = { 
    name: 'name' 
}
printInfoFn.myCall(person, 'going', 'eat') 
