/**
 * 发布订阅
 */
class EventEmitter {
    constructor() {
        this._eventpool = {};
    }
    // 订阅
    on(event, callback) {
        this._eventpool[event]
            ? this._eventpool[event].push(callback) // 如果有人订阅过了，这个键已经存在，就往里面加就好了
            : this._eventpool[event] = [callback] // 没人订阅过，就建一个数组，回调放进去
    }
    // 发布
    emit(event, ...args) {
        // 取出所有订阅者的回调执行
        const subscribedEvents = this._eventpool[event];
        if (subscribedEvents && subscribedEvents.length) {
            subscribedEvents.forEach(cb => {
                cb.call(this, ...args);
            });
        }
    }
    // 取消订阅
    off(event, callback) {
        // 删除某个订阅，保留其他订阅
        const subscribedEvents = this._eventpool[event];
        if (subscribedEvents && subscribedEvents.length) {
            this._eventpool[event] = this._eventpool[event].filter(cb => cb !== callback)
        }
        // 或者简单点就直接删除
        // if (this._eventpool[event]) {
        //    delete this._eventpool[event]
        // }
    }
    // 触发一次，即调用后就删除
    once(event, callback) {
        this.on(event, (...args) => {
            callback(...args);
            // 执行后就删除该订阅
            if (this._eventpool[event]) {
               delete this._eventpool[event]
            }
        })
    }
}

const EventEmitter = new EventEmitter();
