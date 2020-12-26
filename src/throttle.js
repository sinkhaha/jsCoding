/**
 * 节流：简单理解为控制水的流量，控制时间发生的频率，如控制为1s发生一次
 * 
 * 指连续触发事件但是在 n 秒中只执行一次函数，与防抖不同的是防抖是一段时间执行一次
 * 
 * 节流重在加锁
 * 
 * 应用场景：
 * 1. sroll事件，每隔1s计算一次位置信息等
 * 2. 浏览器播放事件，每隔1s计算一次进度信息等
 * 3. input框实时搜索并发送请求展示下拉列表，每隔1s发送一次请求
 * 
 * @param {*} func 
 * @param {*} delay 
 */
function throttle(func, delay) {
    let timer = null;

    return function (...arg) {
        // 节流重在加锁
        if (timer) {
            return;
        }
        timer = setTimeout(() => {
            func.apply(this, arg);
            timer = null;
        }, delay);

    }
}

// 处理函数
function handle() {
    console.log(Math.random());
}
throttle(handle, 2000);