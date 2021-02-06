'use strict';
/**
 * 大文件拷贝
 */
const fs = require('fs');
const path = require('path');

const fileName1 = path.resolve(__dirname, 'bigFileData.txt');
const fileName2 = path.resolve(__dirname, 'bigFileDataBak.txt');

// 读取文件的 可读数据流对象
const readStream = fs.createReadStream(fileName1);
// 写入文件的 可写入数据的流 对象
const writeStream = fs.createWriteStream(fileName2);

// 可读流的pipe写入数据到可写流
readStream.pipe(writeStream);

// 'end' 事件在数据被完全消费掉后才会触发，即拷贝完成
readStream.on('end', function () {
    console.log('拷贝完成');
});
