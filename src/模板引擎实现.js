/**
 * 模版引擎实现
 * @param {*} template 
 * @param {*} data 
 * @returns 
 */
function render(template, data) {
    // 模板字符串正则 匹配{{name}}格式
    const reg = /\{\{(\w+)\}\}/;

    // 模板里有模板字符串
    if (reg.test(template)) {
        // 提取当前模板里的字符串变量名
        const name = reg.exec(template)[1];
        // 将第一个模板字符串渲染
        template = template.replace(reg, data[name]);
        // 递归的替换
        return render(template, data);
    }

    // 如果模板没有模板字符串直接返回
    return template;
}

let template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
let data = {
    name: '小明',
    age: 18
}
// 我是小明，年龄18，性别undefined
console.log(render(template, data));