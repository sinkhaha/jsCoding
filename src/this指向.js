var fullname = '1';

var obj = {
    fullname: '2',
    prop: {
        fullname: '3',
        // 如果改成普通函数呢？
        getFullname: () => {
            return this.fullname;
        }
    }
};

// 输出1，因为在于getFullname是箭头函数，如果改成普通函数是输出3
console.log('obj.prop.getFullname()', obj.prop.getFullname());

let test = obj.prop.getFullname;
console.log('test()', test()); // 输出1
