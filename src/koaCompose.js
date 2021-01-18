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
    return function (context, next) {

        function dispatch(i) {
            let fn = middleware[i]
            if (i === middleware.length) {
                fn = next;
            }
            
            if (!fn) {
                return Promise.resolve();
            }
            try {
                return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
            } catch (err) {
                return Promise.reject(err)
            }
        }

        return dispatch(0);
    }
}