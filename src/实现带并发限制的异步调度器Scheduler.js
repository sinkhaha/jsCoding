//JS实现一个带并发限制的异步调度器Scheduler,保证同时运行的任务最多有两个。
//完善代码中Scheduler类,使得以下程序能正确输出：

// class Scheduler {
//     add(promiseCreator) { ... }

//     // ...
// }

// const timeout = (time) => new Promise(resolve => {
//     setTimeout(resolve, time)
// })

// const scheduler = new Scheduler()
// const addTask = (time, order) => {
//     scheduler.add(() => timeout(time))
//         .then(() => console.log(order))
// }

// addTask(1000, '1')
// addTask(500, '2')
// addTask(300, '3')
// addTask(400, '4')
// output: 2 3 1 4

// 一开始,1、2两个任务进入队列
// 500ms时,2完成,输出2,任务3进队
// 800ms时,3完成,输出3,任务4进队
// 1000ms时,1完成,输出1
// 1200ms时,4完成,输出4

// 需要我们控制同时执行的promise个数，比如控制为2个，后面的所有promise都排队等待前面的执行完成
// 先把要执行的promise function 存到数组内
// 既然是最多为2个，那我们必然是要启动的时候就要让两个promise函数执行
// 设置一个临时变量，表示当前执行ing几个promise
// 然后一个promise执行完成将临时变量-1
// 然后借助递归重复执行
class Scheduler {

    constructor() {
        this.list = []; // promise list
        this.maxCount = 2;
        this.tempRunIndex = 0; // current Position
    }

    /**
     * 传入promise
     * @param {*} promiseCreator 
     */
    add(promiseCreator) {
        this.list.push(promiseCreator)
    }

    taskStart() {
        let _this = this;
        for (var i = 0; i < this.maxCount; i++) {
            request.bind(_this)()
        }
    }

    request() {
        if (!this.list || !this.list.length || this.tempRunIndex >= this.maxCount) {
            return
        }

        this.tempRunIndex++
        this.list.shift()().then(() => {
            this.tempRunIndex--
            request.bind(this)()
        })
    }

}

const timeout = (time) => new Promise(resolve => {
    setTimeout(resolve, time)
})

const scheduler = new Scheduler()

// 注意：add传入是的一个函数并返回promise
const addTask = (time, order) => {
    scheduler.add(() => timeout(time))
        .then(() => console.log(order))
}

addTask(1000,1)
addTask(500,2)
addTask(300,3)
addTask(400,4)
 
scheduler.taskStart()
