
/**
 * 链式调用
 * 
 * 要求：输出eat，等待5s，再输出eat,再等待6s，再输出work
 * 
 * 如：
 * eat -> wait 5s -> eat -> wait 6s -> work
 */
class Chain {
    constructor() {
        // chain是一个promise对象
        this.chain = Promise.resolve(this);
    }

    /**
     * 
     * @param {*} time 
     */
    sleep(time) {
        this.chain = this.chain.then((v) => {
            console.log('sleep');
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(v)
                }, time * 1000);
            })
        })
        return this;
    }

    /**
     * 
     */
    eat() {
        this.chain = this.chain.then((v) => {
            console.log('eat')
            return Promise.resolve(v);
        })
        return this;
    }

    /**
     * 
     */
    work() {
        this.chain = this.chain.then((v) => {
            console.log('work');
            return Promise.resolve(v);
        })
        return this;
    }
}

const chain = new Chain();
chain.eat().sleep(5).eat().sleep(6).work();
