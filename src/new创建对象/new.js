function Person(name) {
    this.name = name;
}

/**
 * new过程中会新建对象，此对象会继承`构造器的原型与原型上`的属性，
 * 最后它会被作为实例返回这样一个过程
 * 
 * new的实现原理
 * 1. 创建一个新的对象
 * 2. 新建立的对象的原型属性指向所传的对象的构造函数的原型
 * 3. 执行构造函数，并设置构造函数的this指向新的临时对象
 * 4. 针对第3步构造函数的返回，如果其返回对象，则返回该对象，
 *  如果其返回不为对象，则返回第1步中新的临时对象
 */
/**
 * 实现方式1 利用Object.create
 * @param {*} Parent 
 * @param  {...any} args 
 * @returns 
 */
 function myNew1(Parent, ...args) {
    // 第1和第2步：创建一个新对象，原型为所传对象的原型Parent.prototype
    let instance = Object.create(Parent.prototype);

    // 第3步：传给构造器执行
    let res = Parent.apply(instance, args);

    // 第4步：如果构造器没有返回对象，则返回原来的新建对象
    return typeof res === 'object' 
        ? res
        : instance;
}

let person1 = myNew1(Person, 'zhangsan');
console.log('person1.name==', person1.name);  // zhangsan


/**
 * 实现方式2
 * @returns 
 */
function myNew2() {
    // 第1步
    let newObj = {};

    // 分离出第一个参数，即传入的构造函数
    const constructor = [].shift.call(arguments);
 
    // console.log('constructor是', constructor); // 如[Function: Person]

    // 第2步
    newObj.__proto__ = constructor.prototype;

    // 第3步
    let res = constructor.apply(newObj, arguments);

    // 第4步
    return typeof res === 'object'
        ? res
        : newObj;
}

let person2 = myNew2(Person, 'lisi');
console.log('person2.name==', person2.name);  // lisi

