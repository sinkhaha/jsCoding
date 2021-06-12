/**
 * 实现一个批量请求函数 multiRequest(urls, maxNum)，要求如下：
 * 1. 要求最大并发数 maxNum
 * 2. 每当有一个请求返回，就留下一个空位，可以增加新的请求
 * 3. 所有请求完成后，结果按照 urls 里面的顺序依次打出
 * 
 * 思路，整体采用`递归`调用来实现：
 * 最初发送的请求数量上限为允许的最大值，
 * 并且这些请求中的每一个都应该在完成时继续递归发送，通过传入的索引来
 * 确定了urls里面具体是那个URL，保证最后输出的顺序不会乱，而是依次输出
 *
 * 参考"前端森林" https://mp.weixin.qq.com/s/VLRv3g1ZGaX6x74ajc-APg
 */
/**
 * 
 * @param {*} urls 
 * @param {*} maxNum 
 */
function multiRequest(urls = [], maxNum) {
    // 请求总数量
    const len = urls.length;

    // 根据请求数量创建一个数组来保存请求的结果
    const result = new Array(len).fill(false);

    // 当前完成的数量
    let count = 0;

    return new Promise((resolve, reject) => {
        // 请求maxNum个
        while (count < maxNum) {
            next();
        }

        function next() {
            let current = count++;

            // 处理边界条件,请求全部完成就将promise置为成功状态, 然后将result作为promise值返回
            if (current >= len) {
                !result.includes(false) && resolve(result);
                return;
            }

            const url = urls[current];
            console.log(`开始 ${current}`, new Date().toLocaleString());

            // fetch表示请求的方法
            fetch(url)
                .then((res) => {
                    // 保存请求结果
                    result[current] = res;
                    console.log(`完成 ${current}`, new Date().toLocaleString());

                    // 请求没有全部完成, 就递归
                    if (current < len) {
                        next();
                    }
                })
                .catch((err) => {
                    console.log(`结束 ${current}`, new Date().toLocaleString());
                    result[current] = err;

                    // 请求没有全部完成, 就递归
                    if (current < len) {
                        next();
                    }
                });
        }

    });
}