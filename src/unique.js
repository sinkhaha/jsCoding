/**
 * 数组去重
 * @param {*} arr 
 */
function unique(arr) {
    let appeard = new Set();

    return arr.filter(item => {
        // 创建一个可以唯一标识对象的字符串id
        let id = item + JSON.stringify(item);

        if (appeard.has(id)) {
            return false;
        }
        
        appeard.add(id);
        return true;
    });
}
