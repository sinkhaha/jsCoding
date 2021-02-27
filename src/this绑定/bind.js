
/**
 * 实现bind
 * @param {*} context
 */
Function.prototype.myBind = function(context) {
    let self = this;
    // ...arguments第一个是绑定对象，获取bind方法后面的参数
    let args = [...arguments].slice(1);
    console.log(`args: ${args}`);

    // 闭包
    return function() {
        let args1 = [...arguments];
        console.log(`args1: ${args1}`);

        const allArgs = args.concat(args1);
        return self.apply(context, allArgs);
    }
}

// 测试
function testFn(m, n, o) {
    // zhangsan 7 8 9
    console.log(this.name + ' ' + m + ' ' + n + ' ' + o);
}
let person = {
    name: 'zhangsan'
};

testFn.myBind(person, 7, 8)(9); 
