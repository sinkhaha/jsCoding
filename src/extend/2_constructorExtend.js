/**
 * 构造函数继承
 * @param {*} name 
 */
function Super(name) {
    this.name = name;
    this.colors = ['red', 'blue'];
    this.sayName = function() {
        return this.name;
    }
}
function Sub() {
    // 子类调用父类的构造函数
    Super.call(this, 'Nicholas');
}
var instance1 = new Sub();
var instance2 = new Sub();
instance1.colors.push('black');

instance1.colors; // ['red', 'blue', 'black']
instance2.colors; // ['red', 'blue']