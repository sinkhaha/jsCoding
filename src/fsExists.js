// 怎么判断一个文件是否存在
// 参考 五月君 https://www.nodejs.red/#/nodejs/modules/fs-file-exists-check

// 不推荐使用 fs.exists 而是选择 fs.stat 或 fs.access
// 因为exists已经废弃，且它的回调函数第一个值是一个布尔值，表示文件是否存在，不是一个错误对象

// 1.使用exists
fs.exists('/test.js', (exists) => {
    console.log(exists ? '存在' : '不存在');
});

// 2.使用fs.stat
const stats = await util.promisify(fs.stat)('test.js');
console.log(stats.isDirectory); // false 判断是否是一个目录
console.log(stats.isFile); // true 判断是否是一个文件

// 3.使用fs.access
// 检查文件是否存在于当前目录中
fs.access('test.js', fs.constants.F_OK, (err) => {
    console.log(` ${file}${err ? '不存在' : '存在'} `);
});
// 检查文件是否可读
fs.access(file, fs.constants.R_OK, (err) => {
    console.log(` ${file}${err ? '不可读' : '可读'} `);
});
// 检查文件是否可写
fs.access(file, fs.constants.W_OK, (err) => {
    console.log(` ${file}${err ? '不可写' : '可写'} `);
});
// 检查文件是否存在于当前目录中、以及是否可写
fs.access(file, fs.constants.F_OK | fs.constants.W_OK, (err) => {
    if (err) {
        console.error(` ${file}${err.code === 'ENOENT' ? '不存在' : '只可读'} `);
    } else {
        console.log(` ${file}存在，且可写`);
    }
});


