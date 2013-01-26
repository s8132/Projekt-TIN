var path = require('path'),
	fs = require('fs');
exports.host1 = function(req, res){
	var filePath = '.' + req.url,
        contentType = 'text/html',
        extName;


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