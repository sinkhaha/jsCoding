const fs = require('fs')

/**
 * fs实现拷贝文件  利用fs.open fs.read fs.write fs.close
 * 
 * 参考：http://www.inode.club/node/module_fs.html#%E5%AE%9E%E6%88%98%E8%AE%AD%E7%BB%83%EF%BC%9A
 * 
 * 在 NodeJS 中进行文件操作，多次读取和写入时，一般一次读取数据大小为 64k，写入数据大小为 16k
 * 
 * @param {*} src 
 * @param {*} dest 
 * @param {*} size 默认16k
 */
function copy(src, dest, size = 16 * 1024) {
    // 打开源文件，readFd是文件描述符
    fs.open(src, 'r', (err, readFd) => {
        if (err) {
            console.log(err);
            return;
        }

        // 打开目标文件
        fs.open(dest, 'w', (err, writeFd) => {
            if (err) {
                console.log(err);
                return;
            }

            // 分配缓冲区
            let buf = Buffer.alloc(size);
            let readed = 0; // 下次读取文件的位置
            let writed = 0; // 下次写入文件的位置

            (function next() {
                // 读取 buf是读取数据都写入该buf，0是buf中开始写入的偏移量，从readFd中读取size字节数，readed为从文件开始读取的位置
                fs.read(readFd, buf, 0, size, readed, (err, bytesRead) => {
                    // butesRead为实际读取的字节数
                    readed += bytesRead;

                    // 如果读不到内容关闭文件，当读取的字节数为0，则到达文件的末尾
                    if (!bytesRead)
                        fs.close(readFd, err => console.log('关闭读取源文件'));

                    // 写入
                    fs.write(writeFd, buf, 0, bytesRead, writed, (err, bytesWritten) => {
                        if (err) {
                            console.log('写入', err);
                            return;
                        }
                        // 如果没有内容了同步缓存，并关闭文件后执行回调
                        if (!bytesWritten) {
                            fs.close(writeFd, err => {
                                if (err) {
                                    console.log('关闭文件错误', err);
                                }
                                console.log('关闭文件成功');
                                return;
                            });
                        }
                        writed += bytesWritten;

                        // 递归继续读取然后写入
                        next();
                    });
                });
            })();

        });
    });
}


// 有一个文件 6.txt 内容为 “你好”，一个空文件 7.txt，我们将 6.txt 的内容写入 7.txt 中。


function test() {
    // buffer 的长度
    const BUFFER_SIZE = 3

    // 拷贝文件内容并写入
    copy('6.txt', '7.txt', BUFFER_SIZE);
}

test()