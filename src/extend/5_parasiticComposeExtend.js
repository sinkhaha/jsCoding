/**
 * 寄生组合式继承（最理想的方式）
 * 
 * 重点：通过寄生的方式来修复组“合式继承”的不足，完美的实现继承
 * 
 * 
 * @param {*} name 
 */
function Super(name) {
    this.name = name;
    this.colors = ['red', 'blue'];
};
function Sub(name, age) {
    // 重点：构造函数继承模式，继承父类的实例和属性
    Super.call(this, name);
    this.age = age;
}

Super.prototype.sayName = function () {
    return this.name;
};

// 封装其继承过程
function inheritPrototype(Sub, Super) {
    // 原型式继承模式，用原生的create
    let prototype = Object.create(Super.prototype); // 执行Super的原型对象
    prototype.constructor = Sub; // 一定要修复构造函数指向问题
    Sub.prototype = prototype;
}

inheritPrototype(Sub, Super);

Sub.prototype.sayAge = function () {
    return this.age;
}

let instance = new Sub('lisi', 40);
console.log(instance.sayName()); // lisi
console.log(instance.sayAge()); // 40
