// 方式1：利用set
function unique1(arr) {
    return [...new Set(arr)];
}

// 方式2：利用 Map
function unique2(arr) {
    const last = new Map();
    return arr.filter((item) => !last.has(item) && last.set(item, 1));
}

// 方式3：双层循环
function unique3(arr) {
    let res = []
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0, len = res.length; j < len; j++) {
            if (arr[i] === res[j])
                break;
            if (j === len) res.push(arr[i]);
        }
    }
    return res;
}

// 方式4：indexof
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
