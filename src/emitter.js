
/**
 * emitter 事件机制实现
 */
class MyEventEmitter {
    // 静态属性 默认设置最大监听数
    static defaultMaxListeners = 10;

    constructor() {
        // 保存订阅方法
        this._events = {}; // { 事件名: [事件回调1，事件回调2...] }
    }

    /**
     * 订阅/监听事件
     * @param {*} type 事件名
     * @param {*} listener 事件触发后执行的回调方法
     * @param {*} flags 控制回调插入事件数组的头部还是尾部 默认false，插入尾部
     * @returns 
     */
    on(type, listener, flags = false) {
        if (!this._events) {
            this._events = Object.create(null);
        }

        if (!this._events[type]) {
            this._events[type] = [listener];
            return;
        }

        // 事件回调插入到事件列表的头部还是尾部
        if (flags) {
            this._events[type].unshift(listener);
        } else {
            this._events[type].push(listener); // 默认是插入到尾部的
        }
    }

    /**
     * 发布/触发事件
     * @param {*} type 事件名
     * @param  {...any} args 调用事件方式是的参数
     */
    emit(type, ...args) {
        const eventFnList = this._events[type];
        if (eventFnList && eventFnList.length) {
            // call修正this的指向，使其指向子类实例
            eventFnList.forEach((fn) => fn.call(this, ...args));
        }
    }

    /**
     * 使事件被订阅一次
     * 
     * 这个事件只有触发一次
     * 
     * 实现：将订阅的方法再包裹一层，在执行后将此包裹函数移除
     *
     * @param {*} type 事件名
     * @param {*} listener 事件方法
     */
    once(type, listener) {
        let _this = this;

        // 包裹函数
        // 将订阅的方法再包裹一层，在执行后将此包裹函数移除
        function warpListenerFn(...args) {
            listener(...args);
            _this.off(type, warpListenerFn);
        }

        // origin保存原回调方法的引用，用于删除时判断
        warpListenerFn.origin = listener;

        this.on(type, warpListenerFn);
    }

    /**
     * 退订
     * @param {*} type 
     * @param {*} listener 
     */
    off(type, listener) {
        const eventFnList = this._events[type];
        if (eventFnList && eventFnList.length) {
            this._events[type] = eventFnList.filter(fn => {
                // origin为once中保存的原回调的引用
                return fn !== listener && fn.origin !== listener;
            })
        }
    }

    /**
     * 添加到事件监听数组的开头
     * 
     * 注意此方法调用多次则会添加多次
     * 
     * 跟on方法的区别是，on方法则是添加到末尾
     * 
     * @param {*} type 
     * @param {*} listener 
     */
    prependListener(type, listener) {
        this.on(type, listener, true);
    }

    // off方法的别名
    removeListener(type, listener) {
        this.off(type, listener);
    }

    // on方法的别名
    addListener(type, listener, flags) {
        this.on(type, listener, flags);
    }
}

module.exports = MyEventEmitter;