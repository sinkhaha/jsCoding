/**
 * 简单版
 * 
 * Object.create()方法会继承指定的原型对象的属性和方法去创建一个新的对象
 * 该方法接收两个参数，
 * 第一个参数是这个新创建的对象的原型，
 * 第二个是可选参数，与Object.definePropertperties()方法的第二个参数格式相同
 *
 * 实现Object的create创建对象方法
 * 其实就是生成一个实例，这个实例的原型由我们指定，但是它的构造函数F被隐藏了
 * 
 * 具体实现：
 * (1)创建一个对象
 * (2)继承指定父对象
 * (3)为新对象扩展新属性
 * 
 * @param {*} obj
 * @param {*} properties
 */
function myCreate(obj) {
    let F = function () { };

    // 新建对象的原型指向所传入的对象
    F.prototype = obj;

    return new F();
}

// 测试
let person = {
    name: "lisi"
};

let p1 = myCreate(person);
let p2 = Object.create(person);

console.log(p1.name);
console.log(p2.name);
console.log(p1.name == p2.name); // true

function Son(name) {
    this.name = name;
}
let s1 = myCreate(Son);
let s2 = Object.create(Son);
console.log(s1.name);
console.log(s2.name);
console.log(s1.name == s2.name); // true

let s3 = myCreate(Son.prototype); // 原型对象，myCreate方法里面没有调用Son的构造方法，所以不会继承Son实例的属性，所以是undefined
let s4 = Object.create(Son.prototype);
console.log(s3.name); // undefined
console.log(s4.name); // undefined
console.log(s3.name == s4.name); // false


/**
 * 官方版Polyfill
 */
function myCreate2() {
    if (typeof Object.create !== 'function') {
        Object.create = function (proto, propertiesObject) {
            if (typeof proto !== 'object' && typeof proto !== 'function') {
                throw new TypeError('Object prototype may only be an Object: ' + proto);
            } else if (proto === null) {
                throw new Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.");
            }

            if (typeof propertiesObject !== 'undefined') throw new Error("This browser's implementation of Object.create is a shim and doesn't support a second argument.");

            function F() { }
            F.prototype = proto;

            return new F();
        };
    }
}
