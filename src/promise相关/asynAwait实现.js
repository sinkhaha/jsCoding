
/**
 * 利用generator实现async/await
 */

function readFile(file) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(file);
        }, 1000);
    })
};

/**
 * 自己实现的异步接口
 * @param {*} generator 接收一个生成器
 */
function myAsyncFunc(generator) {
    // 取得迭代器对象
    const iterator = generator();

    // data为第一次执行之后的返回结果，用于传给第二次执行
    const next = (data) => {
        console.log(`data=${data}`);
        // 第二次执行，并接收第一次的请求结果 data
        let { value, done } = iterator.next(data);
        console.log(`value=${value} done=${done}`);

        // 执行完毕(到第三次)直接返回
        if (done) {
            return;
        }

        // 第一次执行next时，yield返回的 promise实例 赋值给了 value
        value.then(data => {
            // 当第一次value 执行完毕且成功时，执行下一步(并把第一次的结果传递下一步)
            next(data);
        });
    }
    // 执行迭代器
    next();
};

// 生成器函数(具体的代码执行逻辑，控制代码一步步执行)
function* myGenerator() {
    let data = yield readFile('test1.js');
    data = yield readFile(data + 'test2.js');
    console.log(`data是${data}`); // data是test1.js test2.js
    return data;
};

// 调用异步函数实现async功能
myAsyncFunc(myGenerator);

// 输出结果如下：
// data=undefined
// value=[object Promise] done=false
// data=test1.js
// value=[object Promise] done=false
// data=test1.jstest2.js
// data是test1.jstest2.js
// value=test1.jstest2.js done=true
