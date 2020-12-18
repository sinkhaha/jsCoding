/**
 * 函数柯里化
 * @param  {...any} args1 
 */
function sum(...args1) {
    return function (...args2) {
        return [...args1, ...args2].reduce((p, n) => p + n)
    }
}
console.log(sum(1, 2, 2)(7));