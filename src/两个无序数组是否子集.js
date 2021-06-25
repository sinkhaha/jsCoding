/**
 * 
 * 判断无序数组arr2是否是arr1的子集
 * 
 * @param {*} arr1 
 * @param {*} arr2 
 */
function isChild(arr1, arr2) {
    let n1 = arr1.length;
    let n2 = arr2.length;

    // 先排序
    arr1.sort();
    arr2.sort();

    // 双指针
    let i = 0; // 指向arr1
    let j = 0; // 指向arr2
    while (i < n1 && j < n2) {
        if (arr1[i] < arr2[j]) {
            i++;
        } else if (arr1[i] === arr2[j]) {
            i++;
            j++;
            // 因为arr2是arr1的子集，所以同个位置的arr1的元素不能比arr2大
        } else if (arr1[i] > arr2[j]) {
            return false;
        }
    }

    return j === n2;
}

console.log(isChild([1, 4, 3, 6, 7], [2, 3])); // false
console.log(isChild([1, 4, 3, 6, 7], [1, 3])); // true