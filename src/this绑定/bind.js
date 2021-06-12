
/**
 * 实现bind
 * @param {*} context
 */
Function.prototype.myBind = function (context) {
    let self = this;

    // ...arguments第一个是绑定对象，获取bind方法后面的参数
    let args = [...arguments].slice(1);
    console.log(`args参数是: ${args}`); // args参数是: 7,8

    // 闭包
    return function () {
        let args1 = [...arguments];
        console.log(`args1参数是: ${args1}`); // args1参数是: 9

        const allArgs = args.concat(args1);
        return self.apply(context, allArgs);
    }
}

function testFn(m, n, o) {
    console.log(this.name + ' ' + m + ' ' + n + ' ' + o);
}
let person = {
    name: 'zhangsan'
};
// 测试，调用testFn参数，this指向person对象
testFn.myBind(person, 7, 8)(9); // zhangsan 7 8 9
