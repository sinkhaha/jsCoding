/**
 * 
 * Koa 中间件的实现原理，也就是洋葱模型的实现原理，核心在于next的实现。
 * next需要依次调用队列中下一个middleware，当到最后一个的时候结束即resolve，这样后面middleware的promise先resolve，然后直到第一个，这样的流程也就是洋葱模型的流程了
 * 
 * 每次传入的next都是调用下一个middleware，是一个递归的过程，结束条件是最后一个middleware的next是用户传入的
 * 
 * 是一种尾递归的形式，尾递归的特点是最后返回的值是一个递归的函数调用，这样执行完就会在调用栈中销毁，不会占据调用栈
 * 
 * 返回的是一个Promise.resolve包装之后的调用，而不是同步的调用，
 * 所以这是一个异步递归，异步递归比同步递归的好处是可以被打断，如果中间有一些优先级更高的微任务，那么可以先执行别的微任务
 * 
 * compose是函数复合，把n个middleware复合成一个，参数依然是context和next，这种复合之后依然是一个middleware，还可以继续进行复合
 * 
 * @param {*} middleware 
 */
function compose(middleware) {
    // 判断是否为数组，不是则抛出异常
    if (!Array.isArray(middleware)) {
        throw new TypeError('不是数组');
    }
    
    // 判断 middleware 数组中的中间件是否为函数
    for (const fn of middleware) {
       if (typeof fn !== 'function') {
            throw new TypeError('中间件不是方法')
        }
    }

    // context为上下文，next可以不要，此next并不是中间件执行的next参数
    return function (context, next) {
        // 保存上一次执行的中间件，用于判断同一个中间件是否重复调用next方法
        let index = -1;
        
        function dispatch(i) {
            // 同一个中间件重复调next报错
            if (i <= index) 
                return Promise.reject(new Error('next() called multiple times'));
            
            index = i;
            
            // 获取第i个中间件
            let fn = middleware[i];
            
            // 最后一个中间件调用next()时会执行该语句，不过此时传入的next是undefined
            if (i === middleware.length) {
                fn = next; // 如果没传next参数，直接 return Promise.resolve()即可
            }
            
            // 所有的返回都是Promise对象，Promise对象可以保证中间件和返回请求对象之间的执行顺序
            if (!fn) {
                return Promise.resolve();
            }
            try {
                // 执行第 i 个中间件，并传入第 i + 1 个中间件，所以中间件中调用next()，就会执行dispatch.bind(null, i + 1)下一个中间件
                return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
            } catch (err) {
                return Promise.reject(err)
            }
        }
        
        // 从第1个中间件开始执行
        return dispatch(0);
    }
}


/*
打印出
middleware_1_1
middleware_2_1
middleware_2_2
middleware_1_2
*/
// const middleware_1 = async function (next) {
//     console.log('middleware_1_1');
//     await next();
//     console.log('middleware_1_2');
// }

// const middleware_2 = async function (next) {
//     console.log('middleware_2_1');
//     await next();
//     console.log('middleware_2_2');
// }

// compose([middleware_1, middleware_2])();

