/**
 * 节流
 * 
 * 指连续触发事件但是在 n 秒中只执行一次函数，与防抖不同的是防抖是一段时间执行一次
 * 
 * @param {*} func 
 * @param {*} delay 
 */
function throttle(func, delay) {
    let timer = null;
    return function (...arg) {
        if (!timer) {
            timer = setTimeout(() => {
                func.apply(this, arg);
                timer = null;
            }, delay);
        }
    }
}

// 处理函数
function handle() {
    console.log(Math.random());
}
throttle(handle, 2000);