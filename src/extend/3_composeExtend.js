/**
 * 组合继承(组合原型链继承和借用构造函数继承)(常用)
 * 
 * 重点：结合了两种模式的优点，传参和复用
 * 
 * 特点：
 * 1. 可以继承父类的`属性和方法`，也能继承父类`原型上`的属性和方法，可以传参，可复用
 * 2. 每个新实例引入的构造函数属性是私有的
 * 
 * 缺点：调用了两次父类构造函数（耗内存），子类的构造函数会代替原型上的那个父类构造函数
 *  　　　
 * @param {*} name 
 */
function Super(name) {
    this.name = name;
    this.colors = ['red', 'blue'];
};
function Sub(name, age) {
    // 重点，用构造函数继承模式
    Super.call(this, name);
    this.age = age;
}
Super.prototype.sayName = function () {
    return this.name;
};

// 重点：用原型链继承模式
Sub.prototype = new Super();

Sub.prototype.sayAge = function () {
    return this.age;
}

Sub.prototype.weight = 100;

let instance = new Sub('zhangsan', 30);
console.log(instance.sayName()); // zhangsan  子类能调用父类原型上的方法
console.log(instance.sayAge()); // 30
console.log(instance.weight); // 100

let instance2 = new Sub('lisi', 40);
console.log(instance2.sayName()); // lisi  子类能调用父类原型上的方法
console.log(instance2.sayAge()); // 40
console.log(instance2.weight);

let super1 = new Super('wangwu');
console.log(super1.name); // wangwu
console.log(super1.colors); // [ 'red', 'blue' ]

// 子类实例属性改变，不会影响其他实例
console.log(instance.colors); // [ 'red', 'blue' ]
instance.colors = ['yellow'];
console.log(instance.colors); // [ 'yellow' ]
console.log(instance2.colors); // [ 'red', 'blue' ] 不会影响instance2实例的属性
console.log(super1.colors); // [ 'red', 'blue' ]

// 子类实例改变原型属性，其他实例不会改变
instance.weight = 120;
console.log(instance.weight); // 120
console.log(instance2.weight); // 100
