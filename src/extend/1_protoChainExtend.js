/**
 * 原型链继承
 * 
 * 重点：让子类的原型对象指向父类的实例（即子类实例的原型指向父类的实例）
 * 
 * 特点：实例可继承的属性有：实例的构造函数属性，父类构造函数属性，父类原型的属性和方法
 * （新实例不会继承父类实例的属性和方法）
 * 
 * 缺点：
 * 1. 子类新实例不能向父类的构造方法参数
 * 2. 继承单一
 * 3. 所有新实例都会共享父类实例的属性(某个实例修改父类引用类型的属性时，其他实例该属性也会改变)(原型上的属性是共享的，一个实例修改了原型属性，另一个实例的原型属性也会被修改)
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
Sub.prototype = new Super('张三');

var instance1 = new Sub(20);
console.log(instance1.name); // 张三  子类实例可以访问父类的属性
console.log(instance1.age); // 20
console.log(instance1.colors); // [ 'red', 'blue' ]
instance1.colors = ['yellow'];
console.log(instance1.colors); // [ 'yellow' ]

// 缺点：改变instance1实例原型上的共享属性，其他实例该属性也会改变
Object.getPrototypeOf(instance1).name = '李四';

var instance2 = new Sub(30);
console.log(instance2.name); // '李四'
console.log(instance2.age); // 30
console.log(instance2.colors); // [ 'red', 'blue' ]
