var fs = require('fs'),
	util = require('util'),
	spawn = require('child_process').spawn;

exports.admin = function(req, res){
	res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
	var tail = spawn('tail', ['-f', './logs/logi.log']);

	tail.stdout.on('data', function (data) {
        res.write(data),
        
    console.log('#---');
    
    console.log(req.headers['user-agent']);
    console.log('#---');
    res.writeHead(200, {
        'Content-Type': 'text/javascript; charset=utf-8'
    });
    tail.stdout.on('data', function (data) {
        res.write(data);
    });
    req.connection.on('end', function () {
        
        tail.kill();
    });
    });
};