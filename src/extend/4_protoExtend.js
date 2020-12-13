/**
 * 原型式继承
 * 
 * 重点：用一个函数包装一个对象，然后返回这个函数的调用，
 * 这个函数就变成了个可以随意增添属性的实例或对象。object.create()就是这个原理
 * 
 * 特点：类似于复制一个对象，用函数来包装
 * 
 * 缺点：
 * 1. 所有实例都会继承原型上的属性
 * 2. 无法实现复用（新实例属性都是后面添加的）
 *
 * @param {*} obj 
 */
function create(obj) {
    function F(){};
    F.prototype = obj; // 继承了传入的参数
    return new F();
}

var person = {
    name: 'lisi',
    friends: ['zhangsan', 'wangwu']
};
var anotherPerson = create(person);

console.log(anotherPerson.name); // lisi 继承了父类函数的属性

anotherPerson.friends.push('haha');
console.log(person.friends); // [ 'zhangsan', 'wangwu', 'haha' ]
