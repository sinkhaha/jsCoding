/**
 * 防抖
 * 
 * 用于减少函数的请求次数，对于频繁的请求，只执行最后一次请求
 * 
 * 防抖重在清零
 * 
 * 使用场景：
 * 1. 给按钮加函数防抖防止表单多次提交，如登陆、发短信等按钮为了避免用户点击太快，以致于发送了多次请求，需要防抖
 * 2. 对于输入框连续输入进行 AJAX 验证时，用函数防抖能有效减少请求次数
 * 3. 文本编辑器实时保存，当无任何更改操作一秒后进行保存
 * 
 * @param {*} func 
 * @param {*} wait 
 */
function debounce(func, wait = 300) {
    let timeout = null;
    return function () {
        // 防抖重在清零
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