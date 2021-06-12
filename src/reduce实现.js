/**
 * reduce的实现
 * 
 * reduce的用法：
 * arr.reduce(function(prev, cur, index, arr){}, initialValue)
 * 
 * @param {*} fn 
 * @param {*} initialValue 
 */
Array.prototype.myReduce = function (fn, initialValue) {
    let [val, idx] = initialValue
        ? [initialValue, 0]
        : [this[0], 1]; // 设置初始值

    for (let i = idx, len = this.length; i < len; i++) {
        val = fn(val, this[i], i, this);
    }

    return val;
}

console.log([1, 2, 3, 4].reduce((pre, item) => pre + item, 0)); // 10