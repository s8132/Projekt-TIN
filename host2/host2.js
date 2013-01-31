var path = require('path'),
	fs = require('fs'),
    logs = require('../lib/logs.js').logs,
    errors = require('../lib/logs.js').errors;

exports.host2 = function(req, res){
    'use strict';
	var filePath = './host2' + req.url,
        contentType = 'text/html',
        extName;


    switch(filePath){
        case './host2/' :
            filePath = './host2/index.html';
            break;
        case './host2/fiesta' :
            filePath = './host2/fiesta.html';
            break;
        case './host2/focus' :
            filePath = './host2/focus.html';
            break;
        case './host2/mondeo' :
            filePath = './host2/mondeo.html';
            break;
        case './host2/odczyt' :
            filePath = './host2/odczyt.html';
            break;
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

    fs.exists(filePath, function(exists){
        if(exists){
            fs.readFile(filePath, function(err, content){
                if(err){
                    errors(req, "Can't read file: " + filePath);
                    res.writeHead(500);
                    res.end('Error 500');
                    logs(req, res);
                }else{
                    res.writeHead(200, {
                        'Content-Type': contentType
                    });
                    res.end(content, 'utf-8');
                    logs(req, res);
                }
            });
        }else{
            errors(req, 'File no exist: ' + filePath);
            res.writeHead(404);
            res.end('Error 404');
            logs(req, res);
        }
    });
};