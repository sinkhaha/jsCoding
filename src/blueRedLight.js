
/**
 * setTimeout实现休眠或等待功能的函数
 * @param {*} delayTime 延迟的时间
 * @param {*} result 一些参数
 */
function sleep(delayTime, result) {
    return new Promise(function(resolve, reject) {
        setTimeout(() => { 
            console.log(`当前是  ${result}  灯`);
            resolve();
         }, delayTime);
    });
}

/**
 * 
 * 使用promise 实现红绿灯颜色的跳转
 * 红灯执行1秒后
 * 绿灯执行2秒后
 * 黄灯执行3秒
 * 
 */
async function colorTest() {
    while (1) {
        await sleep(1000, '红');
        await sleep(2000, '绿');
        await sleep(3000, '黄');
    }
}

colorTest();



