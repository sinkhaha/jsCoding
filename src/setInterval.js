/**
 * setTimeout实现setInterval
 * @param {*} fn 
 * @param {*} interval 
 * @param  {...any} args 
 */
function myInterval(fn, interval, ...args) {
    let context = this;

    setTimeout(() => {
        fn.apply(context, args);
        myInterval(fn, interval, ...args);
    }, interval);
}

myInterval((num) => console.log(num), 2000, 1);