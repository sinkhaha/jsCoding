// 怎么判断一个文件是否存在
// 参考 五月君 https://www.nodejs.red/#/nodejs/modules/fs-file-exists-check

// 不推荐使用 fs.exists 而是选择 fs.stat 或 fs.access
// 因为exists已经废弃，且它的回调函数第一个值是一个布尔值，表示文件是否存在，不是一个错误对象

const fs = require('fs');
const path = require('path');
const util = require('util');
const fsPromises = fs.promises;

let myFile = 'test.txt';
// 1.使用exists 已经过期
fs.exists(myFile, (exists) => {
    console.log(exists ? 'exists 存在' : 'exists 不存在');
});

if (fs.existsSync(myFile)) {
    console.log('existsSync 存在');
}


// 2.使用fs.stat
async function testStat1() {
    const stats = await util.promisify(fs.stat)(myFile)
        .catch(e => {
            console.log('testStat1 不存在', e);
        });
    if (!stats) {
        return;
    }    
    console.log('testStat1 stats.isDirectory', stats.isDirectory()); // false 判断是否是一个目录
    console.log('testStat1 stats.isFile', stats.isFile()); // true 判断是否是一个文件
}
testStat1();

async function testStat2() {
    const stats = await fsPromises.stat(myFile)
        .catch(e => {
            console.log('testStat2 不存在', e);
        });
    if (!stats) {
        return;
    }       
    console.log('testStat2 stats.isDirectory', stats.isDirectory()); // false 判断是否是一个目录
    console.log('testStat2 stats.isFile', stats.isFile()); // true 判断是否是一个文件
}
testStat2();

// 3.使用fs.access
// 检查文件是否存在于当前目录中
fs.access(myFile, fs.constants.F_OK, (err) => {
    console.log(` ${myFile}${err ? 'access 不存在' : 'access 存在'} `);
});

// promise api
fsPromises.access(myFile, fs.constants.F_OK)
    .then(() => console.log('fsPromises.access 存在'))
    .catch(() => console.error('fsPromises.access 不存在'));

// 检查文件是否可读
fs.access(myFile, fs.constants.R_OK, (err) => {
    console.log(` ${myFile}${err ? 'access 不可读' : 'access 可读'} `);
});
// 检查文件是否可写
fs.access(myFile, fs.constants.W_OK, (err) => {
    console.log(` ${myFile}${err ? 'access 不可写' : 'access 可写'} `);
});
// 检查文件是否存在于当前目录中、以及是否可写
fs.access(myFile, fs.constants.F_OK | fs.constants.W_OK, (err) => {
    if (err) {
        console.error(`${myFile}${err.code === 'ENOENT' ? '不存在' : '只可读'} `);
    } else {
        console.log(`${myFile}存在，且可写`);
    }
});


// 4. fs.open打开文件
fs.open(myFile, function (err, fd) {
    if (err) {
        console.log('fs.open不存在', err);
        return;
    }
    console.log('fs.open 存在', fd);
    // 打开文件后需要关闭
    fs.close(fd, function(e) {
        if (e) {
            return e;
        }
        console.log('关闭成功');
    });
})