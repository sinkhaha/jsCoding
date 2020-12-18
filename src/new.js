/**
 * 实现new
 * @param {*} constructor 构造方法
 * @param  {...any} args 
 */
function myNew(constructor, ...args) {
    // 构造新的空对象
    let newObj = {};
    newObj.__proto__ = constructor.prototype;

    let result = constructor.apply(newObj, args);
    
    // 构造函数是一个对象，则返回，否则返回新创建的对象
    return result instanceof Object 
        ? result 
        : newObj;
}


function Person(name) {
    this.name = name;
}

let person = myNew(Person, 'lisi');
console.log(person.name);  // lisi