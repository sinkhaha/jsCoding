/**
 * 防抖
 * 
 * 防抖用于减少函数的请求次数，对于频繁的请求，只执行这些请求的最后一次
 * 
 * 使用场景：
 * 1. 给按钮加函数防抖防止表单多次提交
 * 2. 对于输入框连续输入进行 AJAX 验证时，用函数防抖能有效减少请求次数
 * 
 * @param {*} func 
 * @param {*} wait 
 */
function debounce(func, wait = 300) {
    var timeout = null;
    return function () {
        if (timeout !== null) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(func.bind(this), wait);
    }
}

// 处理函数
function handle() {
    console.log(Math.random());
}

debounce(handle, 2000);