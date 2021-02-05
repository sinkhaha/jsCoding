const { once } = require('events');
const fs = require('fs');
const { createInterface } = require('readline');

/**
 * 
 * @param {*} path 
 * @param {*} handler 
 */
async function processLineByLine(path, handler) {
    let res = [];
    try {
        const rl = createInterface({
            input: fs.createReadStream(path),
            crlfDelay: Infinity
        });

        rl.on('line', (line) => {
            res.push(handler(line, res));
        });

        await once(rl, 'close');

        console.log('文件已处理');
        
        return res;
    } catch (err) {
        console.error(err);
    }
}