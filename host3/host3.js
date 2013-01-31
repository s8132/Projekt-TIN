var path = require('path'),
	fs = require('fs'),
    logs = require('../lib/logs.js').logs,
    errors = require('../lib/logs.js').errors;

exports.host3 = function(req, res){
    'use strict';
	var filePath = './host3' + req.url,
        contentType = 'text/html',
        extName;


    switch(filePath){
        case './host3/' :
            filePath = './host3/index.html';
            break;
        case './host3/page1' :
            filePath = './host3/page1.html';
            break;
        case './host3/page2' :
            filePath = './host3/page2.html';
            break;
        case './host3/page3' :
            filePath = './host3/page3.html';
            break;
        case './host3/500' :
            filePath = './host3/odczyt.html';
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