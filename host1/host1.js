var path = require('path'),
	fs = require('fs'),
    logs = require('../lib/logs.js').logs,
    errors = require('../lib/logs.js').errors;

exports.host1 = function(req, res){
    'use strict';
	var filePath = './host1' + req.url,
        contentType = 'text/html',
        extName;


    switch(filePath){
        case './host1/' :
            filePath = './host1/index.html';
            break;
        case './host1/gdansk' :
            filePath = './host1/gdansk.html';
            break;
        case './host1/sopot' :
            filePath = './host1/sopot.html';
            break;
        case './host1/gdynia' :
            filePath = './host1/gdynia.html';
            break;
        case './host1/neptun' :
            filePath = './host1/neptun.html';
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
                    res.end();
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
            res.end();
            logs(req, res);
        }
    });
};