var fs = require('fs');

exports.logs = function(request, response){
	'use strict';

	var data = new Date();
	var str = '';
	str += data.getDate() + '.' + data.getMonth()+1 + '.' + data.getFullYear();
	str += ' ' + data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds();

	var log = request.connection.remoteAddress +  ' - - [' + str + ']' + ' "' + request.method + ' ' + request.url + ' HTTP/' + request.httpVersion + '" ' + response.statusCode + ' "-" "' + request.headers['user-agent'] + '"\n';

	var logJson = {
		hostname: request.virtualhost.hostname,
		date: str,
		ipClient: request.connection.remoteAddress,
		method: request.method,
		url: request.url,
		statusCode: response.statusCode,
		userAgent: request.headers['user-agent']
	};


	fs.readFile('./logs/logi.json', function (error, content) {
		if(!error){
			var obj = JSON.parse(content);
			obj.logs.push(logJson);
			
			fs.writeFile('./logs/logi.json', JSON.stringify(obj));
		}
	});

	fs.appendFile('./logs/logi.log', log);
};

exports.errors = function(request, message){
	'use strict';

	var data = new Date();
	var str = '';
	str += data.getDate() + '.' + data.getMonth()+1 + '.' + data.getFullYear();
	str += ' ' + data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds();

	var errorLog = "["+str+"] [error] [client " + request.connection.remoteAddress + "] " + message + "\n";

	fs.appendFile('./logs/error.log', errorLog);
};