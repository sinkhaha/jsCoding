
/**
 * setTimeout实现休眠或等待功能的函数
 * @param {*} delayTime 延迟的时间
 * @param {*} color 一些参数
 */
function sleep(delayTime, color) {
    return new Promise(function(resolve, reject) {
        setTimeout(() => { 
            // console.log(`当前是  ${result}  灯`);
            resolve(color);
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
        const red = await sleep(1000, '红');
        console.log(`当前是 ${red} 灯`)

        const green = await sleep(2000, '绿');
        console.log(`当前是 ${green} 灯`)

        const yellow = await sleep(3000, '黄');
        console.log(`当前是 ${yellow} 灯`)
    }
}

colorTest();



