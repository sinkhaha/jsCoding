/**
 * 检测变量的类型
 * @param {any} target 需要检测的对象
 * @param {string} type 类型字符串，如string, number...
 * @return {boolean} 
 */
function isType(target, type) {
    console.log('Object.prototype.toString.call==', Object.prototype.toString.call(target));
    let targetType = Object.prototype.toString.call(target).slice(8, -1).toLowerCase();
    return targetType === type.toLowerCase();
}

console.log(isType(function () { }, 'function')); // true  [object Function]
console.log(isType(undefined, 'undefined')); // true  [object Undefined]
console.log(isType(null, 'null')); // true  [object Null]
console.log(isType(/\d+/, 'RegExp')); // true  [object RegExp]
console.log(isType(new Date(), 'Date')); // true  [object Date]
console.log(isType([], 'Array')); // true  [object Array]
console.log(isType(Symbol(1), 'Symbol')); // true  [object Symbol]
console.log(isType(1n, 'bigint')); // true  [object BigInt]