/**
 * 组合继承
 * @param {*} name 
 */
function Super(name) {
    this.name = name;
    this.colors = ['red', 'blue'];
};
function Sub(name, age) {
    // 第二次调用
    Super.call(this, name);
    this.age = age;
}
Super.prototype.sayName = function () {
    return this.name;
};
// 第一次调用
Sub.prototype = new Super();
Sub.prototype.constructor = Sub;
Sub.prototype.sayAge = function () {
    return this.age;
}

var instance = new Sub('lee', 40);
instance.sayName(); // lee
instance.sayAge(); // 40