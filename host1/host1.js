var path = require('path'),
	fs = require('fs'),
    logs = require('../lib/logs.js').logs;
exports.host1 = function(req, res){
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

    // fs.readFile(filePath, function(error, content){
    // 	if(!error){
    // 		res.writeHead(200, {
    // 			'Content-Type' : 'text/html'
    // 		});
    // 		res.end(content, 'utf-8');
    // 	}else{
    // 		console.log(error);
    // 	}
    // });

    logs(req, res);

   
};