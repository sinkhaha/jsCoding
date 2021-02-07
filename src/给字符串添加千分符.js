/**
 * 123456789.01 转换 123,456,789.01
 */
function test() {
    let num = 123456789.01;
    // toFixed四舍五入保留2位小数位
    // $&：表示与 regexp 相匹配的子串
    let result = num.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
    console.log(result);
}

test();