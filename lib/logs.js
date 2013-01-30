var fs = require('fs');

exports.logs = function(request, response){

	var data = new Date();
	var str = '';
	str += data.getDate() + '.' + data.getMonth()+1 + '.' + data.getFullYear();
	str += ' ' + data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds();

	var log = "["+request.virtualhost.hostname + "] [" + str + "] [status (error/ info)] [" + request.connection.remoteAddress + "] [" + request.method + "] [" + request.url + "] [" + 
		response.statusCode + "] [" + request.headers['user-agent'] + "] \n";

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
		//fileJson = JSON.parse(content);
		
		var gg = JSON.parse(content);
		gg.logs.push(logJson);
		
		fs.writeFile('./logs/logi.json', JSON.stringify(gg), function(err, files){

		});		

	});

	var ws = fs.createWriteStream('./logs/logi.log', {flags: 'a+', mode: 0666});
	ws.write(log);
	ws.end();
};