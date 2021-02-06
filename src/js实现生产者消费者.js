
/**
 * 因为node使用单线程的方式实现，所以使用定时器timer取代线程thread来实现生产者消费者模型。
 */
var sigintCount = 0;

// 生产者数组
var productArray = [];
var productArrayLen = 0;

var productLock = false;
var PRODUCT_ARRAY_THRESHOLD = 10; // 阈值

var sleep = function () {
    clearInterval(producerTimer);
    clearInterval(consumerTimer);
    console.log('Production has been completed and the productArrayLen is:' + productArrayLen);
}

/**
 * 生产者
 */
var producerTimer = setInterval(function () {
    if (!productLock) {
        if (!productLock) {
            productLock = true;
            if (productArrayLen < PRODUCT_ARRAY_THRESHOLD) {
                productArrayLen++;
                productArray.push('product');
                console.log('product:' + productArrayLen + '    producer.push');
            } else {
                // 达到生产目标，休眠线程
                sleep();
            }
            productLock = false;
        }
    }
}, 500);

/**
 * 消费者
 */
var consumerTimer = setInterval(function () {
    if (!productLock) {
        if (!productLock) {
            productLock = true;
            if (productArrayLen > 0) {
                var product = productArray.shift();
                productArrayLen--;
                console.log('product:' + productArrayLen + '    producer.pop');
            } else {
                console.log('product:' + productArrayLen + '    producer.idle');
            }
            productLock = false;
        }
    }
}, 1000);
