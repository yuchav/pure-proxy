const http = require("http");
const log = require('./log.js');
const config = require('./config.js');
const cors = require('./cors.js');

function bindError(req, res, id) {
    return function(err) {
        const msg = String(err.stack || err);
        log("[%s] 发生错误: %s", id, msg);
        if (!res.headersSent) {
            res.writeHead(500, { "content-type": "text/plain" });
        }
        res.end(msg);
    };
}


function proxy(req, res) {

    if (config.cors && req.method === 'OPTIONS') {
        cors(res);
        res.writeHead(200, res.headers);
        res.end('');
    }

    // 生成代理请求信息
    const options = {
        hostname: config.targetHost,
        port: config.targetPort,
        method: req.method,
        path: req.url,
        headers: req.headers
    };

    const id = `${req.method} ${req.url} => ${options.hostname}:${options.port}`;

    // 发送代理请求
    const req2 = http.request(options, res2 => {
        res2.on("error", bindError(req, res, id));

        if (config.cors) {
            cors(res2);
        }

        res.writeHead(res2.statusCode, res2.headers);

        res2.pipe(res);
    });
    req.pipe(req2);
    req2.on("error", bindError(req, res, id));
}

module.exports = proxy;