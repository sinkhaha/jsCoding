/**
 * 原型链继承
 * 
 * 让子类的原型父类的实例
 * 
 * 缺点：子类不能传父类的参数
 * 
 * @param {*} name 
 */
function Super(name) {
    this.name = name;
    this.colors = ['red', 'blue'];
};

function Sub(age) {
    this.age = age;
};

// 子类的原型父类的实例实现继承
Sub.prototype = new Super('Lee');

var instance1 = new Sub(20);
console.log(instance1.name); // Lee  子类实例可以访问父类的属性
console.log(instance1.age); // 20
console.log(instance1.colors); // [ 'red', 'blue' ]
instance1.name = ['yellow'];
console.log(instance1.colors); // [ 'yellow' ]

var instance2 = new Sub(30);
console.log(instance2.name); // Lee
console.log(instance2.age); // 30
console.log(instance2.colors); // [ 'red', 'blue' ]
