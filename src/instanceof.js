/**
 * 实现 instanceof
 * 
 * 左边的原型属性是否等于右边的原型对象
 * 
 * @param left 左参数为一个实例对象
 * @param right 右参数为要判断的构造器函数
 * @return
 */
function instanceOf(left, right) {
    // 获取目标原型对象
    let prototype = right.prototype;

    // proto属性
    left = left.__proto__; // 或Object.getPrototypeOf(left)

    while (true) {
        if (left == null) {
            return false;
        } else if (left == prototype) {
            return true;
        }
        
        // 循环获取左边的原型属性
        left = left.__proto__; // 或Object.getPrototypeOf(left)
    }
}

console.log(instanceOf({}, Object));
console.log(instanceOf(1, Number));
