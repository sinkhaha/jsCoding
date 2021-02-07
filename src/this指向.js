var fullname = '1';
var obj = {
    fullname: '2',
    prop: {
        fullname: '3',
        //如果改成普通函数呢？
        getFullname: () => {
            return this.fullname;
        }
    }
};

console.log(obj.prop.getFullname()); // 输出1， 在于getFullname是箭头函数，如果改成普通函数是输出3
var test = obj.prop.getFullname; 
console.log(test()); // 输出1
