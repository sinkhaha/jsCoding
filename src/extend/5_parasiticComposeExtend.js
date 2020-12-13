/**
 * 继承组合式继承
 * @param {*} name 
 */
function Super(name) {
    this.name = name;
    this.colors = ['red', 'blue'];
};
function Sub(name, age) {
    Super.call(this, name);
    this.age = age;
}
Super.prototype.sayName = function () {
    return this.name;
};

// 我们封装其继承过程
function inheritPrototype(Sub, Super) {
    // 以该对象为原型创建一个新对象
    var prototype = Object.create(Super.prototype);
    prototype.constructor = Sub;
    Sub.prototype = prototype;
}

inheritPrototype(Sub, Super);

Sub.prototype.sayAge = function () {
    return this.age;
}

var instance = new Sub('lee', 40);
instance.sayName(); // lee
instance.sayAge(); // 40