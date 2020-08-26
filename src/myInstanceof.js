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
    let prototype = right.prototype; // 获取目标原型对象
  
    left = left.__proto__;
  
    while (true) {
        if(left == null) {
            return false;
        } else if (left == prototype) {
            return true;
        }
        // 循环获取左边的原型属性
        left = left.__proto__;
    }
}

console.log(instanceOf({}, Object));
console.log(instanceOf(1, Number));

