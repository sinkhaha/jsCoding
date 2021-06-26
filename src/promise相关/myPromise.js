/**
 * promise实现
 */
const PENDING = 'PENDING';      // 进行中
const FULFILLED = 'FULFILLED';  // 已成功
const REJECTED = 'REJECTED';    // 已失败

class MyPromise {
    constructor(executor) {
        this.resolvedCallbacks = []; // 成功回调函数队列
        this.rejectedCallbacks = []; // 失败回调函数队列

        // 初始状态
        this.state = PENDING;

        this.value = undefined;
        this.reason = undefined;

        const resolve = value => {
            // 只有进行中状态的才能更改状态
            if (this.state === PENDING) {
                this.state = FULFILLED;
                this.value = value;
                // 成功态函数依次执行
                this.resolvedCallbacks.forEach(cb => cb(value));
            }
        }

        const reject = reason => {
            if (this.state === PENDING) {
                this.state = REJECTED;
                this.reason = reason;

                this.rejectedCallbacks.forEach(cb => cb(value));
            }
        }

        // 这里的异常捕获是重点
        try {
            // 执行这个异步函数，传入resolve和reject
            executor(resolve, reject);
        } catch (e) {
            // 抛出错误
            reject(e);
        }
    }

    /**
     * then方法
     * @param {*} onFulfilled 
     * @param {*} onRejected 
     */
    then(onFulfilled, onRejected) {
        // 保证为函数
        onFulfilled = typeof onFulfilled === 'function'
            ? onFulfilled
            : value => value;

        onRejected = typeof onRejected === 'function'
            ? onRejected
            : reason => { throw new Error(reason instanceof Error ? reason.message : reason) };

        // 保存this    
        const self = this;

        /**
         * 1. 进行中的处理
         * 2. 成功的处理
         * 3. 拒绝的处理 
         * 
         * 返回新的promise对象
         */
        return new Promise((resolve, reject) => {
            // 1. 进行中的处理
            if (this.state === PENDING) {
                self.resolvedCallbacks.push(() => {
                    try {
                        // setTimeout模拟微任务
                        setTimeout(() => {
                            const result = onFulfilled(self.value);
                            // 分两种情况：
                            // 1. 回调函数返回值是Promise，执行then操作
                            // 2. 如果不是Promise，调用新Promise的resolve函数
                            result instanceof Promise
                                ? result.then(resolve, reject)
                                : resolve(result);
                        });
                    } catch (e) {
                        reject(e);
                    }
                });

                self.rejectedCallbacks.push(() => {
                    try {
                        setTimeout(() => {
                            const result = onRejected(self.reason);
                            // 不同点，不是promise直接reject
                            result instanceof Promise
                                ? result.then(resolve, reject)
                                : reject(result);
                        });
                    } catch (e) {
                        reject(e);
                    }
                });
                // 2. 成功的处理
            } else if (this.state === FULFILLED) {
                try {
                    setTimeout(() => {
                        const result = onFulfilled(self.value);
                        result instanceof Promise
                            ? result.then(resolve, reject)
                            : resolve(result);
                    });
                } catch (e) {
                    reject(e);
                }
                // 3. 拒绝的处理    
            } else if (this.state === REJECTED) {
                try {
                    setTimeout(() => {
                        const result = onRejected(self.reason);
                        result instanceof Promise
                            ? result.then(resolve, reject)
                            : reject(result);
                    });
                } catch (e) {
                    reject(e);
                }
            }
        });
    }

    /**
     * catch方法
     * @param {*} onRejected 
     */
    catch(onRejected) {
        return this.then(null, onRejected);
    }

    static resolve(value) {
        // 是promise实例，直接返回，如果不是Promise实例，返回一个新的Promise对象，状态为FULFILLED
        return value instanceof Promise
            ? value
            : new Promise((resolve, reject) => resolve(value));
    }

    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason);
        });
    }
}

/**
 * finally方法实现
 * @param {*} callback 
 */
MyPromise.prototype.finally = function (callback) {
    this.then(value => {
        return Promise.resolve(callback()).then(() => {
            return value;
        })
    }, error => {
        return Promise.resolve(callback()).then(() => {
            throw error;
        });
    });
}
