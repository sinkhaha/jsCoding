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
 * 3. 所有新实例都会共享父类实例的属性(某个实例修改父类引用类型的属性时，其他实例该属性也会改变)(和原型链继承一样)
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
var anotherPerson2 = create(person);

console.log(anotherPerson.name); // lisi 继承了父类函数的属性
console.log(anotherPerson2.name); // lisi 继承了父类函数的属性，不是引用类型，不会改变

anotherPerson.friends.push('haha');
// 引用类型，因为是共享，所以值改变了
console.log(person.friends);  //  ["zhangsan", "wangwu", "haha"]
console.log(anotherPerson.friends);  //  ["zhangsan", "wangwu", "haha"]
console.log(anotherPerson2.friends);  //  ["zhangsan", "wangwu", "haha"]
