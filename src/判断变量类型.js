/**
 * 检测变量的类型
 * @param {any} target 需要检测的对象
 * @param {string} type 类型字符串，如string, number...
 * @return {boolean} 
 */
function isType(target, type) {
    let targetType = Object.prototype.toString.call(target).slice(8, -1).toLowerCase();
    return targetType === type.toLowerCase();
}

console.log(isType(function() {}, 'function')); // true
console.log(isType(undefined, 'undefined')); // true
console.log(isType(null, 'null')); // true
console.log(isType(/\d+/, 'RegExp')); // true
console.log(isType(new Date(), 'Date')); // true
console.log(isType([], 'Array')); // true
console.log(isType(Symbol(1), 'Symbol')); // true