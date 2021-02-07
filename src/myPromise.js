class MyPromise {
    constructor(fn) {
        this.resolvedCallbacks = [];
        this.rejectedCallbacks = [];

        this.state = 'PENDING';
        this.value = '';

        fn(this.resolve.bind(this), this.reject.bind(this));
    }

    resolve(value) {
        if (this.state === 'PENDING') {
            this.state = 'RESOLVED';
            this.value = value;

            this.resolvedCallbacks.map(cb => cb(value));
        }
    }

    reject(value) {
        if (this.state === 'PENDING') {
            this.state = 'REJECTED';
            this.value = value;

            this.rejectedCallbacks.map(cb => cb(value));
        }
    }

    then(onFulfilled, onRejected) {
        if (this.state === 'PENDING') {
            this.resolvedCallbacks.push(onFulfilled);
            this.rejectedCallbacks.push(onRejected);

        }

        if (this.state === 'RESOLVED') {
            // ?
            onFulfilled(this.value);
        }

        if (this.state === 'REJECTED') {
            onRejected(this.value);
        }
    }
}
