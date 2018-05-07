const http = require('http');
const config = require('./config.js');
const port = 3000;
const proxy = require('./proxy.js');

const server = http.createServer(proxy);

server.listen(config.proxyPort, () => {
    console.log('proxy server start at ' + config.proxyPort);
});

server.on("error", (err) => {
    console.log('proxy server error', err);
});