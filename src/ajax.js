/**
 * ajax封装请求
 * 
 * @param {*} method 
 * @param {*} url 
 * @param {*} params 
 * @param {*} callback 
 */
function ajax(method, url, params, callback) {
    method = method.toUpperCase();
    let postParams = null;
    let getParams = '';

    if (method === 'GET') {
        if (typeof params === 'object') {
            let tempArr = [];
            for (let key in params) {
                tempArr.push(`${key}=${params[key]}`);
            }
            params = tempArr.join('&');
        }
        getParams = `?${params}`;
    } else {
        postParams = params;
    }

    // 发请求
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return
        callback(xhr.responseText);
    }

    xhr.open(method, url + getParams, false)
    if (method === 'POST') {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }

    xhr.send(postParams);
}

ajax('get', 'https://www.baidu.com', { id: 1 }, data => console.log(data));