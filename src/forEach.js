/**
 * 实现forEach
 * @param {*} fn 
 * @param {*} temp_this 
 */
Array.prototype.myForEach = function (fn, temp_this) {
    for (let i = 0, len = this.length; i < len; i++) {
        // 循环数组元素,为回调函数传入参数
        fn.call(temp_this, this[i], i, this); 
    }
}