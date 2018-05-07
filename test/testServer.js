const http = require('http');
const port = 3001;

const server = http.createServer();

server.on('request',(req,res)=>{
	req.pipe(res);
});

server.listen(port, () => {
    console.log('server start at ' + port);
});

server.on("error", (err) => {
    console.log('server error', err);
});
