//JS实现一个带并发限制的异步调度器Scheduler，保证同时运行的任务最多有两个
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

/**
 * 需要我们控制同时执行的promise个数，比如控制为2个，
 * 后面的所有promise都排队等待前面的执行完成
 */
class Scheduler {
	constructor() {
		this.waitTasks = []; // 待运行的任务
		this.usingTask = []; // 正在运行的任务
		this.maxNum = 2; // 最多有两个任务在运行
	}

	/**
	 * 添加要执行的函数
	 * 
	 * promiseCreator 是一个异步函数，返回一个promise
	 * 
	 * @param {*} promiseCreator 
	 * @returns 
	 */
	add(promiseCreator) {
		return new Promise((resolve, reject) => {
			promiseCreator.resolve = resolve;

			// 没超过最大任务数，则执行函数，超过则添加到待执行任务里
			if (this.usingTask.length < this.maxNum) {
				this.usingRun(promiseCreator);
			} else {
				this.waitTasks.push(promiseCreator);
			}
		})
	}

	/**
	 * 执行任务
	 * @param {*} promiseCreator 
	 */
	usingRun(promiseCreator) {
		this.usingTask.push(promiseCreator);

		promiseCreator().then(() => {
			// 外部promise resolve掉
			promiseCreator.resolve();

			this.usingMove(promiseCreator);

			// 还有待执行的任务则继续下一个
			if (this.waitTasks.length > 0) {
				// 递归
				this.usingRun(this.waitTasks.shift());
			}
		})
	}

	/**
	 * 从队列中移除已经执行的函数
	 * @param {*} promiseCreator 
	 */
	usingMove(promiseCreator) {
		let index = this.usingTask.findIndex(promiseCreator);
		this.usingTask.splice(index, 1);
	}
}

/**
 * 睡眠函数
 * @param {*} time 
 * @returns 
 */
const timeout = (time) => new Promise(resolve => {
	setTimeout(resolve, time);
})

const scheduler = new Scheduler();

/**
 * 往调度器添加睡眠函数
 * @param {*} time 
 * @param {*} order 
 */
const addTask = (time, order) => {
	scheduler
		.add(() => timeout(time))
		.then(() => console.log(order));
}

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');
// 2 3 1 4