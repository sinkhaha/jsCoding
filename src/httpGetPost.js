const http = require('http');
const url = require('url');
const querystring = require('querystring');

/**
 * http实现get/post
 */
let method = {
    // get方法
    GET: function getFn(req, res) {
        const requestData = url.parse(req.url, true);
        let urlPath = requestData.path;
        let urlData = requestData.query;

        let log = "==>urlPath:" + urlPath +"==>>urlData:"+ JSON.stringify(urlData);
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
            let parseData = querystring.parse(dataStr);
            console.log("parseData:", parseData);
            res.write(new Buffer(dataStr, "utf8"));
            res.end();
        })
    }
};

http.createServer((request, respond) => {
    let reqMethod = request.method;
    method[reqMethod](request, respond);
}).listen(3000, function () {
    console.log('监听端口:%s', 3000);
});
