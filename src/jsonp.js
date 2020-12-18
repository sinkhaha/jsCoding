/**
 * jsonp的实现
 * 
 * @param {*} url 
 * @param {*} params_obj 
 * @param {*} callback 
 */
function jsonp(url, params_obj, callback) {
    // 创建一个供后端返回数据调用的函数名
    let funcName = 'jsonp_' + Data.now() + Math.random().toString().substr(2, 5);

    //将参数拼接成字符串
    if (typeof params === 'object') {
        let temp = [];
        for (let key in params) {
            temp.push(`${key}=${params[key]}`);
        }
        params = temp.join('&');
    }

    // 在html中插入<script>资源请求标签
    let script = document.createElement('script');
    script.src = `${url}?${params}&callback=${funcName}`;
    document.body.appendChild(script);

    //在本地设置供后端返回数据时调用的函数
    window[funcName] = data => {
        callback(data);

        delete window[funcName];
        document.body.removeChild(script);
    }
}

jsonp('http://www.baidu.com', { id: 123 }, data => {
    console.log(data);
});

// js插入html中标签的内容
// <script src="https://www.baidu.com?callback=funcName"></script>

// 后端返回的<script>资源的内容
//<script src="https://www.baidu.com?callback=funcName">
// funcName('datadatadatadatadatadatadatadata')
//</script>