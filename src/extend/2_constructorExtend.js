/**
 * 构造函数继承
 * 
 * 重点：用.call()和.apply()将父类构造函数引入子类函数
 * （在子类函数中做了父类函数的自执行（复制））
 * 
 * 特点：
 * 1. 只继承了父类属性和方法，没有继承父类原型的属性和方法
 * 2. 解决了原型链继承3个缺点
 * 3. 可以实现多继承，即继承多个构造函数属性（call多个）
 * 4. 在子实例中可向父实例传参
 * 
 * 缺点：
 * 1. 只能继承父类构造函数的属性
 * 2. 方法都在都在构造函数中定义，无法复用（每次用每次都要重新调用）
 * 3. 每个新实例都有父类构造函数的副本，臃肿
 * 
 * @param {*} name 
 */
function Super(name) {
    this.name = name;
    this.colors = ['red', 'blue'];
    this.sayName = function() {
        return this.name;
    }
}
// 父类的原型上的属性，子类无法继承
Super.prototype.age = 20;

function Sub() {
    // 重点：子类调用父类的构造函数，可以向父类传参，这里可以call多个父类
    Super.call(this, 'zhangsan');
}
var instance1 = new Sub();
var instance2 = new Sub();
instance1.colors.push('black');

console.log(instance1.colors); // ['red', 'blue', 'black']
console.log(instance1.sayName()); // zhangsan
console.log(instance2.colors); // ['red', 'blue']
console.log(instance1.age); // undefined 子类实例无法继承父类原型链上的属性
