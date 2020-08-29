// 具体三个步骤就是：
// (1)创建一个对象
// (1)继承指定父对象
// (2)为新对象扩展新属性
/**
 * 实现Object的create创建对象方法
 * @param {*} obj
 * @param {*} properties
 */
Object.myCreate = function(obj, properties) {
    var F = function () { }
    F.prototype = obj;
    if (properties) {
        Object.defineProperties(F, properties);
    }
    return new F();
}

Object.myCreate({}, { a: { value: 1 } }); // {a: 1}
