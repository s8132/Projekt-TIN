var http = require('http'),
	virtualhost = require('virtualhost'),
	io = require('socket.io'),
	fs = require('fs'),
	path = require('path'),
	host1 = require('./host1/host1.js').host1,
	host2 = require('./host2/host2.js').host2,
	host3 = require('./host3/host3.js').host3,
	admin = require('./admin/admin.js').admin;

	//Próba dodawania hostów
	//var tab = [require('../express/host2/app').app, require('../express/host3/app').app];

	var apps = {
		"host1.local" : host1,
		"host2.local" : host2,
		"host3.local" : host3,
		"admin.local" : admin
	};

	//Próba dodawania hostów
	//apps['host3.local']	= tab[0];

var server = http.createServer(virtualhost(apps, function(req, res){
	'use strict';
	var filePath = '.' + req.url,
        contentType = 'text/html',
        extName;

    if (filePath === './') {
        filePath = './index.html';
    }

    extName = path.extname(filePath);

    switch (extName) {
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
    }

    path.exists(filePath, function (exists) {
        if (exists) {
            fs.readFile(filePath, function (error, content) {
                if (error) {
                    res.writeHead(500);
                    res.end();
                } else {
                    res.writeHead(200, {
                        'Content-Type': contentType
                    });
                    res.end(content, 'utf-8');
                }
            });
        } else {
            res.writeHead(404);
            res.end();
        }
    });
}));

var sock = io.listen(server);

var spawn = require('child_process').spawn;

sock.on('connection', function (client) {
	'use strict';
    
	var tail = spawn("tail", ["-f", "./logs/logi.json"]);

	tail.stdout.on("data", function (data){
		client.send(data.toString('utf-8'));
	});

});

server.listen(9090);
