/**
 * reduce实现map
 * @param {*} callback 
 * @returns 
 */
Array.prototype.map = function (callback) {
    let arr = this;
    return arr.reduce((acc, cur, i) => {
        acc.push(callback(cur, i, arr));
        return acc;
    }, []);
}

let m = [1, 2, 3, 4, 54].map(function (v, i, arr) {
    return v * v;
});
console.log(m);
