var path = require('path'),
	fs = require('fs'),
    logs = require('../lib/logs.js').logs;
exports.host1 = function(req, res){
	var filePath = '.' + req.url,
        contentType = 'text/html',
        extName;

    // console.log("Virtual host: " + req.virtualhost);
    //     console.log("\tHost name: " + req.virtualhost.hostname);
    //     console.log("\tPort: " + req.virtualhost.port);
    //     console.log("\tMatch: " + req.virtualhost.match);
    //     console.log("\tname: " + req.virtualhost.name);
    // console.log("Client: " + req.client);
    //     console.log("\tIdle start: " + req.client._idleStart);
    // console.log("statusCode: " + req.statusCode);
    // console.log("Method: " + req.method);
    // console.log("URL: " + req.url);
    // console.log("Headers: " + req.headers);
    //     console.log("\thost: " + req.headers.host);
    //     console.log("\tUser-agent: " + req.headers['user-agent']);
    //     console.log("\tAceppt: " + req.headers.accept);
    //     console.log("\tAccept-language: " + req.headers['accept-language']);
    //     console.log("\tAccept-encoding: " + req.headers['accept-encoding']);
    // console.log("Http version: " + req.httpVersion);
    // console.log("Complete: " + req.complete);
    // console.log("Connection: " + req.connection);
    //     console.log("\tIP address: " + req.connection.remoteAddress);

    

    
    fs.readFile('./host1/index.html', function(error, content){
    	if(!error){
    		res.writeHead(200, {
    			'Content-Type' : 'text/html'
    		});
    		res.end(content, 'utf-8');
    	}else{
    		console.log(error);
    	}
    });

    logs(req, res);

    // console.log('request starting...' + filePath);
    // if (filePath === './') {
    //     filePath = './index.html';
    // }
    // extName = path.extname(filePath);
    // switch (extName) {
    // case '.js':
    //     contentType = 'text/javascript';
    //     break;
    // case '.css':
    //     contentType = 'text/css';
    //     break;
    // }

    // path.exists(filePath, function (exists) {
    //     if (exists) {
    //         fs.readFile(filePath, function (error, content) {
    //             if (error) {
    //                 res.writeHead(500);
    //                 res.end();
    //             } else {
    //                 res.writeHead(200, {
    //                     'Content-Type': contentType
    //                 });
    //                 res.end(content, 'utf-8');
    //             }
    //         });
    //     } else {
    //         res.writeHead(404);
    //         res.end();
    //     }
    // });
};