// 方式1：利用set
function unique1(arr) {
    return [...new Set(arr)];
}

// 方式2：利用 Map
function unique2(arr) {
    const last = new Map();
    return arr.filter((item) => !last.has(item) && last.set(item, 1));
}

// 方式3
function unique3(arr) {
    let idSet = new Set();

    return arr.filter(item => {
        // 创建一个可以唯一标识对象的字符串id
        let id = item + JSON.stringify(item);

        if (idSet.has(id)) {
            return false;
        }

        idSet.add(id);
        return true;
    });
}

// 方式4：indexOf
function unique4(arr) {
    let res = []
    for (let i = 0; i < arr.length; i++) {
        let current = arr[i];

        if (res.indexOf(current) === -1)
            res.push(current);
    }
    return res;
}

// 方式5：filter + indexOf
function unique5(arr) {
    let res = arr.filter(function (item, index, array) {
        return arr.indexOf(item) === index;
    })
    return res;
}

// 方式6：利用排序 + filter
function unique6(arr) {
    return arr.concat().sort().filter(function (item, index, array) {
        return !index || item !== arr[index - 1];
    });
}

let obj = {
    name: 'lisi',
    hobby: [1, 2, 3],
};
let arr = [1, 2, 2, 3, 3, 4, 5, 6, obj, obj];
console.log(unique1(arr));
console.log(unique2(arr));
console.log(unique3(arr));
console.log(unique4(arr));
console.log(unique5(arr));
console.log(unique6(arr));