// 实现中间件的compose方法（toutiao）

// 如下两个中间件
// 使得调用compose([middleware_1, middleware_2])后 输出
// middleware_1_1
// middleware_2_1
// middleware_2_2
// middleware_1_2

const middleware_1 = async function (next) {
    console.log('middleware_1_1');
    await next();
    console.log('middleware_1_2');
}

const middleware_2 = async function (next) {
    console.log('middleware_2_1');
    await next();
    console.log('middleware_2_2');
}

/**
 *
 * koa中间件的compose方法
 * @param {*} middleware
 * @returns
 */
function compose(middleware) {
    if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!');
    for (const fn of middleware) {
        if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!');
    }

    /**
     * @param {Object} context
     * @return {Promise}
     * @api public
     */

    return (function (next) {
        // 标记上一个被调用的中间件
        let index = -1;
        return dispatch(0);

        function dispatch(i) {
            // 同一个中间件重复调next报错
            if (i <= index)
                return Promise.reject(new Error('next() called multiple times'));

            index = i;
            let fn = middleware[i];
            if (i === middleware.length);
                fn = next // 最后一个中间件调用next会执行，此时next是undefined，直接Promise.resolve()也行

            if (!fn) {
                console.log(`没有下一个中间件了 当前是第${i}个 next=${next}`);
                return Promise.resolve();
            }

            try {
                return Promise.resolve(fn(dispatch.bind(null, i + 1)));
            } catch (err) {
                return Promise.reject(err);
            }
        }
    })();
}

compose([middleware_1, middleware_2]);
