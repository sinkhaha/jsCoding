/**
 * new的实现原理
 * 1. 创建一个空的临时对象
 * 2. 链接对象:临时对象的原型属性指向构造函数的原型
 * 3. 执行构造函数，并设置构造函数的this指向新的临时对象
 * 4. 针对第3步构造函数的返回，如果其返回对象，则返回该对象，如果其返回不为对象，则返回新的临时对象（ 实际是返回一个空对象， new Object()就是返回一个空对象{} ）
 *  
 */
function myNew() {
    let newObj = {};

    // 分离出第一个参数，即传入的构造函数
    const constructor = [].shift.call(arguments);

    newObj.__proto__ = constructor.prototype;

    // 调用构造函数
    let result = constructor.apply(newObj, arguments);
    
    return Object.prototype.toString.call(result) === '[object Object]'
        ? result 
        : newObj;
}

function Person(name) {
    this.name = name;
}

let person = myNew(Person, 'lisi');
console.log(person.name);  // lisi