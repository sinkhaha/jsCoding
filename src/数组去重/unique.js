/**
 * 数组去重(数组可含有对象)
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

let obj = { 
    name: 'lisi',
    hobby: [1, 2, 3],
};
let arr = [1, 2, 2, 3, 3, 4, 5, 6, obj, obj];
console.log(unique(arr));

