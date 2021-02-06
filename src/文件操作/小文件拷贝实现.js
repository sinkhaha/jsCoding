/**
 * 实现小文件拷贝 fs.readFile和fs.writeFile
 * 
 * 也可用fs自带的 fs.copyFile(src, dest[, mode], callback)
 */
const fileName1 = path.resolve(__dirname, 'testData.txt');
const fileName2 = path.resolve(__dirname, 'copyTestData.txt');

fs.readFile(fileName1, function (err, data) {
    if (err) {
        console.log(err.message);
        return;
    }

    // 文件的内容
    var dataStr = data.toString();

    // 写入文件
    fs.writeFile(fileName2, dataStr, function (err) {
        if (err) {
            console.log(err.message);
            return;
        }
        console.log('拷贝成功');
    });
});

