
function SingleDog() { }

/**
 * 单例方法（利用闭包实现单例）
 */
SingleDog.getInstance = (function () {
    // 私有变量
    let instance = null;

    return function () {
        if (!instance) {
            // new出唯一实例
            instance = new SingleDog();
        }
        return instance;
    }
})();

const singleDog1 = new SingleDog().getInstance;
const singleDog2 = new SingleDog().getInstance;
console.log(singleDog1 === singleDog2); // true
