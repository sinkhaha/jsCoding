const http = require('http');
const url = require('url');
const querystring = require('querystring');

/**
 * http实现get/post
 */
let method = {
    // get方法
    GET: function getFn(req, res) {
        // res.writeHeader(200, {'Content-Type':'text/javascript;charset=UTF-8'});  //状态码+响应头属性            // res.write(new Buffer(dataStr, "utf8"));

        const requestData = url.parse(req.url, true);
        let urlPath = requestData.path; // 包含url参数
        let urlData = requestData.query; // url参数对象
        let urlPathName = requestData.pathname; // 不包含?后面的参数

        let log = "urlPath==>" + urlPath + "\n" + "pathName==>" + urlPathName +  "\n" + "urlData==>"+ JSON.stringify(urlData);
        console.log(log);
        
        res.write(log);
        res.end();
    },
    // post方法，获取post数据
    POST: function postFn(req, res) {
        let dataStr = '';
        req.on('data', (chunk) => {
            dataStr += chunk;
        })
        req.on('end', () => {
            // 解析成对象
            let parseData = querystring.parse(dataStr);
            console.log("parseData:", parseData);

            res.write(new Buffer(dataStr));
            res.end();
        })
    }
};

http.createServer((request, respond) => {
    let reqMethod = request.method;

    // 匹配对应路径
    // const requestData = url.parse(request.url, true);
    // let urlPathName = requestData.pathname; // 不包含?后面的参数
    // if (method === 'GET' && urlPathName === '/getName') {
    //     // 
    // } 

    method[reqMethod](request, respond);
}).listen(3000, function () {
    console.log('监听端口:%s', 3000);
});
